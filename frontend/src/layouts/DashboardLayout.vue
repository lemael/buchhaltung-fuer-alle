<!-- src/layouts/DashboardLayout.vue -->

<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-title">
        Buchhaltung
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