# Analizador de Gastos — Tarjeta de Crédito

App web single-file para analizar estados de cuenta de tarjeta de crédito (Banco de Chile). Funciona 100% en el navegador: no se sube nada a ningún servidor.

## Features

- Subir un PDF del estado de cuenta y extraer transacciones (nacionales + internacionales).
- Auto-categorización por comercio, con 10 rubros predefinidos + rubros virtuales **Cuotas** y **En dólares**.
- Rubros editables: agregar, renombrar, cambiar color/icono, eliminar.
- Drag & drop para reclasificar, con **aprendizaje persistente** (una vez que mueves un comercio a un rubro, recuerda la asignación para futuras importaciones).
- Panel de detalle redimensionable, agrupación por descripción, muestra la terminación de la tarjeta.
- Gráficos (doughnut + barras) y comparación mes a mes.
- Persistencia en `localStorage` (rubros, aprendizaje, snapshots mensuales).
- **Instalable como PWA** en escritorio y móvil.

## Uso

1. Servir los archivos desde un servidor HTTP (GitHub Pages, `python3 -m http.server`, etc.). El Service Worker no funciona con `file://`.
2. Abrir `gastos-tarjeta.html` (o la raíz `/`, que redirige).
3. Hacer clic en **📤 Subir PDF** y seleccionar el estado de cuenta.

### Instalar como app (Chrome / Edge)

Abrir la app, esperar a que el service worker se registre, luego usar el botón "Instalar" en la barra de direcciones o `Menú → Instalar Analizador de Gastos`.

## Desarrollo local

```bash
python3 -m http.server 8080
# abrir http://localhost:8080/
```

## Archivos

| Archivo | Propósito |
|---|---|
| `gastos-tarjeta.html` | App completa (HTML + CSS + JS) |
| `index.html` | Redirección al HTML principal |
| `manifest.webmanifest` | Manifest PWA |
| `sw.js` | Service Worker (cachea app shell + CDNs) |
| `icon.svg`, `icon-maskable.svg` | Iconos |

## Privacidad

Todo el procesamiento del PDF y el almacenamiento (rubros, aprendizaje, meses guardados) ocurre localmente en tu navegador. No hay backend.
