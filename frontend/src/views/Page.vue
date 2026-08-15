<template>
  <main class="construction-page">
    <div class="construction-card">
      <div class="icon">
        🧾
      </div>

      <span class="badge">
        In Entwicklung
      </span>

      <h1>
        Buchhaltung für alle
      </h1>

      <p class="subtitle">
        Meine Buchhaltungsanwendung befindet sich derzeit in Entwicklung.
      </p>

      <p class="description">
        Eine moderne Webanwendung zur Verwaltung von Einnahmen,
        Ausgaben, Buchungen und finanziellen Übersichten.
      </p>

      <div class="progress">
        <div class="progress-header">
          <span>Projektfortschritt</span>
          <span>10 %</span>
        </div>

        <div class="progress-bar">
          <div class="progress-value"></div>
        </div>
      </div>

      <div class="technologies">
        <span>Vue 3</span>
        <span>TypeScript</span>
        <span>Django REST</span>
        <span>PostgreSQL</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.construction-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f5f7fb;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.construction-card {
  width: 100%;
  max-width: 650px;
  padding: 3rem;
  text-align: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
}

.icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: #f1f5f9;
  border-radius: 50%;
}

.badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  margin-bottom: 1rem;
  color: #92400e;
  background: #fef3c7;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

h1 {
  margin: 0 0 1rem;
  color: #111827;
  font-size: 2.2rem;
  font-weight: 700;
}

.subtitle {
  margin: 0 auto 1rem;
  color: #374151;
  font-size: 1.1rem;
  line-height: 1.6;
}

.description {
  max-width: 520px;
  margin: 0 auto 2rem;
  color: #6b7280;
  line-height: 1.7;
}

.progress {
  margin-bottom: 2rem;
  text-align: left;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  color: #4b5563;
  font-size: 0.9rem;
  font-weight: 600;
}

.progress-bar {
  height: 10px;
  overflow: hidden;
  background: #e5e7eb;
  border-radius: 999px;
}

.progress-value {
  width: 10%;
  height: 100%;
  background: #2563eb;
  border-radius: inherit;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}

.technologies span {
  padding: 0.45rem 0.8rem;
  color: #374151;
  background: #f3f4f6;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 600px) {
  .construction-card {
    padding: 2rem 1.5rem;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>