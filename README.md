# Luka Talent Architect

Landing page oficial para presentar y vender los planes de **Luka Talent Architect**, una propuesta enfocada en ayudar a profesionales a mejorar la forma en que comunican su valor laboral.

Esta página está pensada para funcionar como el centro de una campaña en redes y Meta Ads: la persona ve un anuncio, entra a la página, conoce los planes, elige una opción y continúa el proceso por WhatsApp.

---

## ¿Qué es Luka Talent Architect?

**Luka Talent Architect** es una solución de optimización profesional para personas que quieren presentar mejor su hoja de vida, perfil de LinkedIn, experiencia, logros y estrategia de búsqueda laboral.

La idea no es vender solamente “una hoja de vida bonita”. La propuesta busca construir una presentación profesional más clara, estratégica y competitiva, para que la persona comunique mejor lo que sabe hacer y pueda postularse con mayor dirección.

La comunicación principal de la página parte de esta idea:

> Muchas personas no tienen un problema de talento. Tienen un problema de comunicación profesional.

---

## ¿Para qué sirve esta página?

Esta landing sirve para:

- Explicar qué hace Luka Talent Architect.
- Presentar los planes disponibles.
- Mostrar qué recibe la persona según el plan elegido.
- Explicar el proceso de compra y entrega.
- Resolver preguntas importantes antes de la compra.
- Llevar a la persona a WhatsApp con una intención clara.

La página está diseñada especialmente para celular, porque la mayoría de personas llegará desde anuncios, publicaciones o historias en Instagram y Facebook.

---

## Planes que presenta la página

### 1. Plan Impulso Inicial

Pensado para estudiantes, perfiles junior, personas operativas o quienes necesitan mejorar rápido su hoja de vida y su perfil profesional.

Incluye una base para organizar y comunicar mejor la experiencia profesional.

**Valor:** $180.000 COP  
**Entrega:** entre 48 y 72 horas para los entregables principales.

---

### 2. Plan Élite Profesional

Pensado para técnicos, tecnólogos y profesionales con experiencia que quieren mejores cargos, mejores salarios o nuevas oportunidades.

Incluye una optimización más completa del perfil profesional, con enfoque en hoja de vida, LinkedIn, ATS, entrevistas, logros y estrategia laboral.

**Valor:** $280.000 COP  
**Entrega:** entre 48 y 72 horas para los entregables principales.

---

### 3. Plan Arquitectura Total

Es la opción más completa.

Incluye todo lo del Plan Élite Profesional, más una sesión individual de claridad profesional/coaching ontológico para trabajar dirección, creencias, bloqueos, narrativa profesional y próximos pasos.

Está pensado para personas que no solo necesitan mejorar sus documentos, sino también ganar más claridad sobre cómo se están presentando, qué oportunidades quieren buscar y qué puede estar frenando su avance.

**Valor:** definido en la página según la oferta vigente.  
**Entrega:** materiales principales en 48–72 horas, más agendamiento de la sesión.

---

## Flujo de funcionamiento

El proceso está diseñado para ser simple y directo:

```text
Persona ve anuncio o contenido
↓
Entra a la landing
↓
Revisa los planes
↓
Elige el plan que le interesa
↓
Escribe por WhatsApp
↓
Recibe información de pago
↓
Envía comprobante
↓
Comparte su información profesional
↓
Recibe sus materiales
```

WhatsApp es el canal principal para continuar la compra, recibir datos de pago y activar el proceso después del comprobante.

---

## Qué se entrega

La entrega depende del plan elegido.

Como base, la página comunica la entrega de materiales profesionales como:

- Hoja de vida / CV optimizado.
- Carta de presentación.
- Perfil profesional mejorado.
- Herramientas o guías digitales según el plan.
- Optimización de LinkedIn en los planes que lo incluyan.
- Recursos de apoyo para búsqueda laboral.
- Sesión de claridad profesional en el Plan Arquitectura Total.

La página también aclara que los resultados laborales dependen de cada persona, sector y proceso de selección. No se promete empleo garantizado.

---

## Cómo se usan los botones

La página tiene dos tipos de botones:

### Botones generales

Los botones como “Ver planes”, “Elegir mi plan” o “Conocer planes” llevan a la sección de planes.

La idea es que la persona primero entienda las opciones antes de escribir.

### Botones de cada plan

Los botones específicos de cada plan sí abren WhatsApp con un mensaje prellenado.

Esto ayuda a que la conversación llegue más clara desde el inicio, porque la persona ya eligió una opción.

---

## Imágenes usadas

La página usa imágenes ilustrativas para reforzar la propuesta visual:

- `hero-luka-talent-architect.png`  
  Imagen principal de la página.

- `process-visual.png`  
  Imagen del proceso de diagnóstico, optimización y entrega.

- `entregables-bundle.png`  
  Imagen del paquete de entregables profesionales.

Todas deben estar dentro de:

```text
assets/images/
```

También existe un logo en:

```text
assets/logo.png
```

---

## Archivos principales

La página está construida de forma sencilla para poder publicarse en GitHub Pages.

```text
LukaTalentArchitect/
├── index.html      # Contenido principal de la página
├── styles.css      # Diseño visual, colores, responsive y tema oscuro
├── script.js       # Botones de WhatsApp, tema claro/oscuro y eventos básicos
├── assets/         # Logo e imágenes
└── README.md       # Este documento
```

No necesita instalar nada para funcionar.

---

## Cómo abrir la página

Para verla en un computador:

1. Abre la carpeta `LukaTalentArchitect`.
2. Haz doble clic en `index.html`.
3. La página se abrirá en el navegador.

---

## Cómo publicarla en GitHub Pages

Para publicarla:

1. Subir la carpeta a un repositorio de GitHub.
2. Ir a **Settings**.
3. Entrar a **Pages**.
4. En **Build and deployment**, elegir **Deploy from a branch**.
5. Seleccionar la rama `main` y la carpeta `/root`.
6. Guardar.

GitHub generará una URL pública para compartir la página.

---

## Qué se puede editar fácilmente

### Cambiar textos, precios o contenido

Editar el archivo:

```text
index.html
```

Ahí están los títulos, descripciones, planes, preguntas frecuentes y textos visibles.

### Cambiar colores o diseño

Editar el archivo:

```text
styles.css
```

Ahí están los estilos, espacios, tarjetas, botones, colores y diseño responsive.

### Cambiar WhatsApp o mensajes automáticos

Editar el archivo:

```text
script.js
```

Al inicio del archivo está la configuración del número de WhatsApp y los mensajes prellenados de cada plan.

---

## Tema claro y oscuro

La página detecta automáticamente si el navegador está en modo claro u oscuro.

También tiene un botón para cambiar manualmente el tema.

Esto permite que la página se vea bien en ambos modos sin necesidad de crear dos versiones diferentes.

---

## Recomendación de uso

Esta página debe usarse como destino principal de la campaña.

La ruta recomendada es:

```text
Anuncio en Meta Ads
↓
Landing Luka Talent Architect
↓
Elección de plan
↓
WhatsApp
↓
Pago y comprobante
↓
Entrega
```

La página no reemplaza la conversación por WhatsApp, pero ayuda a que las personas lleguen más informadas, entiendan la oferta y puedan elegir mejor el plan.

---

## Nota importante

Luka Talent Architect ayuda a mejorar la presentación profesional, la claridad del perfil y la forma de comunicar el valor laboral.

No se debe comunicar como una garantía de contratación, porque conseguir empleo depende de muchos factores externos: vacante, empresa, experiencia, mercado, proceso de selección y desempeño de cada persona.

La promesa correcta es:

> Ayudarte a presentar mejor tu perfil profesional para que comunique con más claridad, estrategia y dirección.
