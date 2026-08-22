<!-- src/layouts/DashboardLayout.vue -->

<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-title">
        Buchhaltung für Alle
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 80 80" class="sidebar-logo">
              <g fill="none">
                <rect width="56" height="56" x="12" y="12" fill="#f2f2f2" rx="2"/>
                <path stroke="#bdbdbd" stroke-linejoin="round" stroke-width="4" d="M40 12v56m28-28H12"/>
                <path stroke="#2f80ed" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M18 26h16"/>
                <path stroke="#219653" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M45.914 26h16m-8-8v16"/>
                <path stroke="#f2c94c" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m20.343 48.384l5.143 5.143l1.028 1.028l5.143 5.143m0-11.314l-5.143 5.143-1.028 1.028-5.143 5.143"/>
                <path stroke="#eb5757" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M45.891 56.91h16m-16-5.82h16"/>
              </g>
            </svg>
      </div>

      <nav class="navigation">
        <RouterLink
          to="/"
          class="navigation-item"
          active-class="navigation-item--active"
          exact-active-class="navigation-item--active"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          to="/neue-buchung"
          class="navigation-item"
          active-class="navigation-item--active"
        >
          + Neue Buchung
        </RouterLink>

        <RouterLink
          to="/kategorien"
          class="navigation-item"
          active-class="navigation-item--active"
        >
          Kategorien
        </RouterLink>

        <RouterLink
          to="/buchungen"
          class="navigation-item"
          active-class="navigation-item--active"
        >
          Buchungen
        </RouterLink>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
// Le Layout ne contient actuellement aucune logique.
// La navigation est gérée par Vue Router.
// Les données seront gérées par Pinia.
</script>

<style scoped>
/* =========================================
   Layout
   ========================================= */

.dashboard-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;

  background: var(--color-surface);
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
}


/* =========================================
   Sidebar
   ========================================= */

.sidebar {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 298px;
  height: 100vh;

  padding: 16px;

  box-sizing: border-box;
  overflow: hidden;

  background: var(--color-sidebar);
}


/* =========================================
   Sidebar title
   ========================================= */

.sidebar-title {
  flex-shrink: 0;

  font-family: var(--font-family-base);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-title);

  color: var(--color-text-primary);
}


/* =========================================
   Navigation
   ========================================= */

.navigation {
  display: flex;
  flex-direction: column;

  gap: 11px;

  width: 100%;

  padding: 9px 0;

  box-sizing: border-box;
}


/* =========================================
   Navigation item
   ========================================= */

.navigation-item {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 51px;

  padding: 10px 20px;

  box-sizing: border-box;

  color: var(--color-surface);
  text-decoration: none;

  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);

  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}


/* =========================================
   Hover
   ========================================= */

.navigation-item:hover {
  background: rgb(255 255 255 / 8%);
}


/* =========================================
   Active
   ========================================= */

.navigation-item--active {
  background: var(--color-primary);
  border: 1px solid var(--color-border);
}


/* =========================================
   Main content
   ========================================= */

.main-content {
  flex: 1;

  min-width: 0;
  min-height: 100vh;

  margin-left: 298px;

  box-sizing: border-box;
}


/* =========================================
   Responsive
   ========================================= */

@media (max-width: 768px) {
  .sidebar {
    width: 220px;
  }

  .main-content {
    margin-left: 220px;
  }

  .navigation-item {
    font-size: var(--font-size-body);
  }

  .sidebar-title {
    font-size: var(--font-size-title);
  }
}


@media (max-width: 600px) {
  .sidebar {
    width: 72px;
    padding: 12px 8px;
  }

  .sidebar-title {
    display: none;
  }

  .main-content {
    margin-left: 72px;
  }

  .navigation-item {
    padding: 10px 4px;
    font-size: 0;
  }
}
</style>