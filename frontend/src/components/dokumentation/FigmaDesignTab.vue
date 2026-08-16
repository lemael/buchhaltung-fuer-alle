<script setup>
import { ref } from 'vue'

const props = defineProps({
  figmaUrl: {
    type: String,
    default: 'https://www.figma.com/design/X6uXEgX2g27bQrNzl7ShOq/Team-von-maelrostand.tchindefosso-team-library?node-id=3322-2058&t=IinXt3ArQU9vd2oD-0'
  },
  images: {
    type: Array,
    default: () => [
      '/images/figma/dashboard-overview.png',
      '/images/figma/neue-buchung.png',
      '/images/figma/buchungsliste.png',
      '/images/figma/kategorien.png'
    ]
  }
})
</script>

<template>
  <div class="figma-tab-container">
    <!-- Header -->
    <header class="figma-header">
      <div class="header-title">
        <!-- Icon Figma reduced to 16px -->
        <svg class="figma-icon" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
        <h2>Figma Design System</h2>
      </div>

      <!--Button Link -->
      <a :href="figmaUrl" target="_blank" rel="noopener noreferrer" class="figma-button">
        <span>öffnen in Figma</span>
        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </header>

    <!-- Body Scrollable -->
    <main class="figma-body">
      <div v-for="(image, index) in images" :key="index" class="image-card">
        <img :src="image" :alt="`Figma Page ${index + 1}`" loading="lazy" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.figma-tab-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.figma-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Réduction spécifique de l'icône Figma */
.figma-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.header-title h2 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
}

.figma-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #2563eb;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.figma-button:hover {
  background-color: #1d4ed8;
}

.external-icon {
  width: 16px;
  height: 16px;
}

.figma-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.image-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.image-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: contain;
}
</style>