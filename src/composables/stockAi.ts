/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStockQuote, getCompanyInfo } from '~/composables/finnhub';

interface StockRiskAnalysisParams {
  symbol: string;
  investmentAmount: number;
  riskLevel?: 'Low' | 'Medium' | 'High';
  category: 'stock' | 'etf' | 'adr' | 'reit';
}

interface StockRiskAnalysisResult {
  riskLevel: 'Low' | 'Medium' | 'High';
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  explanation: string;
  currentPrice: number;
  targetProfit: number;
  recommendations: {
    low: { entry: number; exit: number; stopLoss: number; explanation: string };
    medium: { entry: number; exit: number; stopLoss: number; explanation: string };
    high: { entry: number; exit: number; stopLoss: number; explanation: string };
  };
}

export const analyzeStockRisk = async (params: StockRiskAnalysisParams): Promise<StockRiskAnalysisResult> => {
  try {
    const [quote, companyInfo] = await Promise.all([
      getStockQuote(params.symbol),
      getCompanyInfo(params.symbol)
    ]);

    // Calculate volatility based on 52-week range
    const volatility = ((companyInfo.high52 - companyInfo.low52) / companyInfo.low52) * 100;

    // Category-specific risk adjustments
    const categoryRiskFactors = {
      stock: {
        volatilityMultiplier: 1.0,
        profitMultiplier: 1.0,
        description: 'Individual stocks carry company-specific risks'
      },
      etf: {
        volatilityMultiplier: 0.7, // Lower risk due to diversification
        profitMultiplier: 0.8,
        description: 'ETFs provide diversification across multiple securities'
      },
      adr: {
        volatilityMultiplier: 1.2, // Higher risk due to international exposure
        profitMultiplier: 1.2,
        description: 'ADRs have additional currency and country-specific risks'
      },
      reit: {
        volatilityMultiplier: 1.1, // Slightly higher risk due to interest rate sensitivity
        profitMultiplier: 1.1,
        description: 'REITs are sensitive to real estate market and interest rates'
      }
    };

    const categoryFactor = categoryRiskFactors[params.category];

    // Calculate risk levels with category adjustments
    const recommendations = {
      low: calculateRiskLevel(quote.price, volatility, 'Low', categoryFactor, companyInfo),
      medium: calculateRiskLevel(quote.price, volatility, 'Medium', categoryFactor, companyInfo),
      high: calculateRiskLevel(quote.price, volatility, 'High', categoryFactor, companyInfo)
    };

    const selectedRisk = params.riskLevel || 'Medium';
    const selectedStrategy = recommendations[selectedRisk.toLowerCase() as keyof typeof recommendations];

    return {
      riskLevel: selectedRisk,
      entryPrice: selectedStrategy.entry,
      exitPrice: selectedStrategy.exit,
      stopLoss: selectedStrategy.stopLoss,
      explanation: selectedStrategy.explanation,
      currentPrice: quote.price,
      targetProfit: ((selectedStrategy.exit - selectedStrategy.entry) / selectedStrategy.entry) * 100,
      recommendations
    };
  } catch (error) {
    console.error('Error analyzing stock risk:', error);
    throw new Error('Failed to analyze stock risk');
  }
};

const calculateRiskLevel = (
  currentPrice: number,
  volatility: number,
  riskLevel: 'Low' | 'Medium' | 'High',
  categoryFactor: any,
  companyInfo: any
) => {
  let entryDiscount, profitTarget, stopLossPercentage;

  // Base risk parameters adjusted by category factors
  switch (riskLevel) {
    case 'Low':
      entryDiscount = 0.02 * categoryFactor.volatilityMultiplier;
      profitTarget = 0.04 * categoryFactor.profitMultiplier;
      stopLossPercentage = 0.015 * categoryFactor.volatilityMultiplier;
      break;
    case 'Medium':
      entryDiscount = 0.04 * categoryFactor.volatilityMultiplier;
      profitTarget = 0.08 * categoryFactor.profitMultiplier;
      stopLossPercentage = 0.03 * categoryFactor.volatilityMultiplier;
      break;
    case 'High':
      entryDiscount = 0.06 * categoryFactor.volatilityMultiplier;
      profitTarget = 0.12 * categoryFactor.profitMultiplier;
      stopLossPercentage = 0.045 * categoryFactor.volatilityMultiplier;
      break;
  }

  // Market condition adjustments
  const marketConditionMultiplier = calculateMarketConditionMultiplier(volatility);
  entryDiscount *= marketConditionMultiplier;
  profitTarget *= marketConditionMultiplier;
  stopLossPercentage *= marketConditionMultiplier;

  const entryPrice = currentPrice * (1 - entryDiscount);
  const exitPrice = entryPrice * (1 + profitTarget);
  const stopLoss = entryPrice * (1 - stopLossPercentage);

  const explanation = generateRiskExplanation(
    riskLevel,
    categoryFactor.description,
    entryPrice,
    exitPrice,
    stopLoss,
    currentPrice,
    volatility,
    companyInfo
  );

  return {
    entry: entryPrice,
    exit: exitPrice,
    stopLoss,
    explanation
  };
};

const calculateMarketConditionMultiplier = (volatility: number): number => {
  if (volatility > 40) return 1.2;      // High volatility
  if (volatility > 20) return 1.0;      // Normal volatility
  return 0.8;                           // Low volatility
};

const generateRiskExplanation = (
  riskLevel: string,
  categoryDescription: string,
  entryPrice: number,
  exitPrice: number,
  stopLoss: number,
  currentPrice: number,
  volatility: number,
  companyInfo: any
): string => {
  const entryPercentage = ((currentPrice - entryPrice) / currentPrice * 100).toFixed(1);
  const profitPercentage = ((exitPrice - entryPrice) / entryPrice * 100).toFixed(1);
  const stopLossPercentage = ((entryPrice - stopLoss) / entryPrice * 100).toFixed(1);

  const riskDescriptions = {
    Low: 'Conservative strategy with emphasis on capital preservation',
    Medium: 'Balanced approach seeking moderate returns with managed risk',
    High: 'Aggressive strategy targeting higher returns with increased risk tolerance'
  };

  return `${riskDescriptions[riskLevel as keyof typeof riskDescriptions]}. ` +
         `${categoryDescription}. ` +
         `Entry point set at ${entryPercentage}% below current price ($${entryPrice.toFixed(2)}). ` +
         `Target profit of ${profitPercentage}% with exit at $${exitPrice.toFixed(2)}. ` +
         `Stop loss at $${stopLoss.toFixed(2)} (${stopLossPercentage}% below entry). ` +
         `Current volatility: ${volatility.toFixed(1)}%. ` +
         `${companyInfo.sector ? `Sector: ${companyInfo.sector}. ` : ''}` +
         `${companyInfo.industry ? `Industry: ${companyInfo.industry}.` : ''}`;
};
