<script lang="ts" setup>
function handleLogout() {}
</script>

<template>
  <div
    tabindex="0"
    role="button"
    class="d-btn d-btn-ghost d-btn-circle d-avatar"
  >
    <Icon
      icon="qlementine-icons:user-16"
      class="size-8"
    />
  </div>
  <ul
    tabindex="0"
    class="d-menu d-menu-sm d-dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
  >
    <li><RouterLink to="/profile">Perfil</RouterLink></li>
    <li><a @click="handleLogout">Sair</a></li>
  </ul>
</template>
