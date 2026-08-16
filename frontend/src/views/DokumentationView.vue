<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, markRaw } from 'vue'

// Import der einzelnen Unterkomponenten für jeden Tab
import RequirementsTab from '../components/dokumentation/RequirementsTab.vue'
import TasksTab from '../components/dokumentation/TasksTab.vue'
import FrontendTab from '../components/dokumentation/FrontendTab.vue'
import BackendTab from '../components/dokumentation/BackendTab.vue'
import DevopsTab from '../components/dokumentation/DevopsTab.vue'
import FigmaDesignTab from '../components/dokumentation/FigmaDesignTab.vue'

type TabId = 'requirements' | 'tasks' | 'frontend' | 'backend' | 'devops' | 'figma-design'

interface Tab {
  id: TabId
  label: string
  icon: string
  component: any
}

const activeTabId = ref<TabId>('requirements')

// Verwendung von shallowRef zur Performance-Optimierung von Vue-Komponenten
const tabs: Tab[] = [
  {
    id: 'requirements',
    label: 'Anforderungskatalog',
    icon: '',
    component: markRaw(RequirementsTab),
  },
  {
    id: 'tasks',
    label: 'Projektaufgaben',
    icon: '',
    component: markRaw(TasksTab),
  },
  {
    id: 'frontend',
    label: 'Frontend-Struktur',
    icon: '',
    component: markRaw(FrontendTab),
  },
  {
    id: 'backend',
    label: 'Backend-Struktur',
    icon: '',
    component: markRaw(BackendTab),
  },
  {
    id: 'devops',
    label: 'DevOps-Struktur',
    icon: '',
    component: markRaw(DevopsTab),
  },
  {
  id: 'figma-design',
  label: 'Figma Design',
  icon: '',
  component: markRaw(FigmaDesignTab),
},
]

// Computed Property zur Ermittlung der aktuell aktiven Komponente
const activeComponent = computed(() => {
  return tabs.find((tab) => tab.id === activeTabId.value)?.component
})

// Funktion zur Synchronisation des aktiven Tabs mit dem Hash in der URL
const syncTabWithHash = () => {
  const hash = window.location.hash.replace('#', '') as TabId
  const isValidTab = tabs.some((tab) => tab.id === hash)
  
  if (isValidTab) {
    activeTabId.value = hash
  }
}

// Handler für Tab-Wechsel beim Klick
const selectTab = (id: TabId) => {
  activeTabId.value = id
  window.location.hash = id
}

onMounted(() => {
  // 1. Initialer Check beim Laden der Seite
  syncTabWithHash()

  // 2. Event-Listener für Vor/Zurück-Browser-Navigation oder Hash-Änderungen
  window.addEventListener('hashchange', syncTabWithHash)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncTabWithHash)
})


</script>

<template>
  <div class="documentation">
    <!-- Header -->
    <header class="documentation-header">
      <div>
        <h1>Dokumentation</h1>
        <p>Konzeption, Architektur und Organisation des Buchhaltungsprojekts.</p>
      </div>
    </header>

    <div class="documentation-layout">
      <!-- Sidebar / Tab-Navigation -->
      <aside class="documentation-sidebar">
        <nav>
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-button"
            :class="{ active: activeTabId === tab.id }"
            :aria-label="tab.label"
            :aria-selected="activeTabId === tab.id"
            @click="selectTab(tab.id)"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </nav>
      </aside>

      <!-- Content: Dynamisches Rendering der ausgewählten Tab-Komponente -->
      <main class="documentation-content">
        <KeepAlive>
          <component :is="activeComponent" />
        </KeepAlive>
      </main>
    </div>
  </div>
</template>

<style scoped>
.documentation {
  min-height: 100%;
  background: #f8fafc;
  color: #1e293b;
}

/* Header */
.documentation-header {
  padding: 32px 40px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.documentation-header h1 {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 700;
}

.documentation-header p {
  margin: 0;
  color: #64748b;
}

/* Layout */
.documentation-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: calc(100vh - 110px);
}

/* Sidebar */
.documentation-sidebar {
  padding: 24px 16px;
  background: white;
  border-right: 1px solid #e2e8f0;
}

.documentation-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #475569;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: 0.2s;
}

.tab-button:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.tab-button.active {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}

.tab-icon {
  font-size: 18px;
}

/* Content */
.documentation-content {
  max-width: 1100px;
  width: 100%;
  padding: 36px 40px;
}

/* Responsive Design */
@media (max-width: 800px) {
  .documentation-layout {
    grid-template-columns: 1fr;
  }

  .documentation-sidebar {
    border-right: 0;
    border-bottom: 1px solid #e2e8f0;
  }

  .documentation-sidebar nav {
    flex-direction: row;
    overflow-x: auto;
  }

  .tab-button {
    width: auto;
    white-space: nowrap;
  }

  .documentation-content {
    padding: 24px 16px;
  }
}
</style>
