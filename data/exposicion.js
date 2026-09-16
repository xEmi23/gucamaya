/**
 * Contenido de las tarjetas de exposición por integrante.
 *
 * Cada entrada se vincula a un integrante de data/team.js a través de
 * `slug` (mismo valor que member.slug). El resumen y el código son el
 * contenido literal que expuso cada persona: no se reescriben aquí.
 */

export const equipo = [
  {
    slug: 'moises-obregon',
    nombre: 'Moises Obregón',
    rol: 'Entorno, escenario y descarga de datos',
    celdas: 'Celdas 1 a 4',
    resumen: [
      'Prepara el entorno de trabajo en Google Colab: instala librerías (appwrite, faker) e importa pandas, numpy y matplotlib/seaborn.',
      'Fija una semilla aleatoria (seed = 42) para que la simulación sea reproducible por cualquier miembro del equipo.',
      'Define el escenario del proyecto: 10 municipios de Antioquia con coordenadas GPS reales, 5 paneles solares por municipio (50 en total) y una ventana de 30 días de historial.',
      'Crea la función que consulta el clima real (temperatura máxima y radiación solar) de cada municipio en la API pública Open-Meteo, con manejo de errores para que un fallo en una ubicación no detenga el proceso.',
    ],
    codigo: [
      {
        titulo: 'Celda 1-2 — Setup del entorno',
        lenguaje: 'python',
        codigo: `!pip install -q appwrite faker

import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from faker import Faker
from datetime import datetime, timedelta
import random

sns.set_theme(style="whitegrid")
fake = Faker("es_CO")
random.seed(42)
np.random.seed(42)`,
      },
      {
        titulo: 'Celda 3 — Escenario: municipios y paneles',
        lenguaje: 'python',
        codigo: `UBICACIONES = {
    "Envigado":    (6.1683, -75.5911),
    "Medellín":    (6.2442, -75.5812),
    "Itagüí":      (6.1719, -75.6122),
    "Sabaneta":    (6.1508, -75.6167),
    "Bello":       (6.3383, -75.5581),
    "Caldas":      (6.0913, -75.6339),
    "La Ceja":     (6.0294, -75.4308),
    "Rionegro":    (6.1537, -75.3736),
    "Copacabana":  (6.3486, -75.5117),
    "Girardota":   (6.3781, -75.4453),
}

PANELES_POR_UBICACION = 5
TOTAL_PANELES = len(UBICACIONES) * PANELES_POR_UBICACION  # 50
DIAS_HISTORIAL = 30

FECHA_FIN = datetime.utcnow().date() - timedelta(days=15)
FECHA_INICIO = FECHA_FIN - timedelta(days=DIAS_HISTORIAL - 1)`,
      },
      {
        titulo: 'Celda 4 — Descarga de clima real (Open-Meteo)',
        lenguaje: 'python',
        codigo: `def obtener_clima(lat, lon, fecha_inicio, fecha_fin):
    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": fecha_inicio.isoformat(),
        "end_date": fecha_fin.isoformat(),
        "daily": "temperature_2m_max,shortwave_radiation_sum",
        "timezone": "auto",
    }
    resp = requests.get(url, params=params, timeout=30)
    resp.raise_for_status()
    data = resp.json()["daily"]
    return pd.DataFrame({
        "fecha_medicion": data["time"],
        "temperatura_max": data["temperature_2m_max"],
        "radiacion_mj_m2": data["shortwave_radiation_sum"],
    })

clima_por_ubicacion = {}
for ubicacion, (lat, lon) in UBICACIONES.items():
    try:
        clima_por_ubicacion[ubicacion] = obtener_clima(lat, lon, FECHA_INICIO, FECHA_FIN)
        print(f"✅ Clima obtenido para {ubicacion}")
    except Exception as e:
        print(f"⚠️ Error obteniendo clima para {ubicacion}: {e}")`,
      },
    ],
  },
  {
    slug: 'emiliano-serna',
    nombre: 'Emiliano Serna',
    rol: 'Simulación física, exportación e integración con Appwrite',
    celdas: 'Celdas 5 a 10',
    resumen: [
      'Calcula la energía que generaría cada panel usando una fórmula física real: convierte radiación solar a Horas de Sol Pico y la multiplica por el área del panel (1.7 m²), la eficiencia de cada panel (16%-21%) y el rendimiento del sistema (80%).',
      'Simula el comportamiento de sensores reales inyectando fallos a propósito: 4% de fallos totales (0 kWh), 5% de mantenimiento (generación reducida) y 2% de lecturas perdidas de temperatura o radiación.',
      'Guarda los 1.500 registros generados en un archivo CSV local.',
      'Conecta el proyecto con la base de datos en la nube Appwrite: carga las credenciales de forma segura, limpia registros anteriores, crea la base de datos/colección/atributos y sube todos los registros, uno por uno.',
    ],
    codigo: [
      {
        titulo: 'Celda 5 — Fórmula física de generación + anomalías',
        lenguaje: 'python',
        codigo: `AREA_PANEL_M2 = 1.7
PERFORMANCE_RATIO = 0.80

for ubicacion, clima_df in clima_por_ubicacion.items():
    for i in range(PANELES_POR_UBICACION):
        eficiencia_panel = np.random.uniform(0.16, 0.21)
        for _, fila in clima_df.iterrows():
            radiacion_mj = fila["radiacion_mj_m2"]
            horas_sol_pico = (radiacion_mj / 3.6) if pd.notnull(radiacion_mj) else 0

            energia_generada_kwh = round(
                horas_sol_pico * AREA_PANEL_M2 * eficiencia_panel * PERFORMANCE_RATIO
                + np.random.normal(0, 0.05), 3
            )
            energia_generada_kwh = max(energia_generada_kwh, 0)

            estado_sensor = "Activo"
            r = np.random.random()
            if r < 0.04:                      # 4% fallo de hardware
                estado_sensor = "Fallo"
                energia_generada_kwh = 0.0
            elif r < 0.09:                     # 5% mantenimiento
                estado_sensor = "Mantenimiento"
                energia_generada_kwh = round(energia_generada_kwh * np.random.uniform(0.2, 0.5), 3)

            if np.random.random() < 0.02:      # 2% dato perdido
                temperatura_max = np.nan`,
      },
      {
        titulo: 'Celda 6 — Exportar a CSV',
        lenguaje: 'python',
        codigo: `NOMBRE_CSV = "telemetria_paneles_solares.csv"
df.to_csv(NOMBRE_CSV, index=False)
print(f"Archivo '{NOMBRE_CSV}' guardado con {len(df)} registros.")`,
      },
      {
        titulo: 'Celda 7 — Credenciales seguras de Appwrite',
        lenguaje: 'python',
        codigo: `from google.colab import userdata
from appwrite.client import Client
from appwrite.services.databases import Databases

APPWRITE_ENDPOINT = userdata.get('EndPoint')
APPWRITE_PROJECT_ID = userdata.get('ID')
APPWRITE_API_KEY = userdata.get('API')

DATABASE_ID = "energia_renovable_db"
TABLE_ID = "telemetria_paneles"

client = Client()
client.set_endpoint(APPWRITE_ENDPOINT)
client.set_project(APPWRITE_PROJECT_ID)
client.set_key(APPWRITE_API_KEY)
databases = Databases(client)`,
      },
      {
        titulo: 'Celda 8 — Borrado de registros previos (paginado)',
        lenguaje: 'python',
        codigo: `def borrar_todos_los_registros():
    total_borrados = 0
    while True:
        resultado = databases.list_documents(
            database_id=DATABASE_ID, collection_id=TABLE_ID,
            queries=[Query.limit(100)]
        )
        documentos = _get_documents(resultado)
        if not documentos:
            break
        for doc in documentos:
            databases.delete_document(DATABASE_ID, TABLE_ID, _get_id(doc))
            total_borrados += 1`,
      },
      {
        titulo: 'Celda 9 — Creación de base de datos, colección y atributos',
        lenguaje: 'python',
        codigo: `def crear_base_y_tabla():
    databases.create(database_id=DATABASE_ID, name="Energía Renovable")
    databases.create_collection(
        database_id=DATABASE_ID, collection_id=TABLE_ID,
        name="Telemetria Paneles Solares",
        permissions=[Permission.read(Role.any()), Permission.create(Role.any())],
    )
    columnas = [
        ("create_string_attribute",   dict(key="id_panel", size=20, required=True)),
        ("create_string_attribute",   dict(key="ubicacion", size=50, required=True)),
        ("create_string_attribute",   dict(key="fecha_medicion", size=10, required=True)),
        ("create_float_attribute",    dict(key="temperatura_max", required=False)),
        ("create_float_attribute",    dict(key="radiacion_solar", required=False)),
        ("create_float_attribute",    dict(key="energia_generada_kwh", required=True)),
        ("create_string_attribute",   dict(key="estado_sensor", size=20, required=True)),
        ("create_datetime_attribute", dict(key="updatedAt", required=True)),
    ]
    for metodo, kwargs in columnas:
        getattr(databases, metodo)(database_id=DATABASE_ID, collection_id=TABLE_ID, **kwargs)`,
      },
      {
        titulo: 'Celda 10 — Carga de los 1.500 registros a Appwrite',
        lenguaje: 'python',
        codigo: `def subir_dataframe_a_appwrite(df, pausa=0.0):
    exitosos, fallidos = 0, 0
    for _, fila in df.iterrows():
        document_data = {k: (None if pd.isna(v) else v) for k, v in fila.to_dict().items()}
        try:
            databases.create_document(DATABASE_ID, TABLE_ID, ID.unique(), document_data)
            exitosos += 1
        except AppwriteException as e:
            fallidos += 1
    print(f"Carga finalizada: {exitosos} filas exitosas, {fallidos} fallidas.")

subir_dataframe_a_appwrite(df)`,
      },
    ],
  },
  {
    slug: 'cristian-uribe',
    nombre: 'Cristian Uribe',
    rol: 'Limpieza de datos, nulos y detección de anomalías',
    celdas: 'Celdas 11 a 13',
    resumen: [
      'Revisa y elimina registros duplicados, y convierte las fechas de texto a formato de fecha real (datetime).',
      'Rellena los datos faltantes de temperatura y radiación usando la mediana propia de cada municipio (no una mediana global), para no distorsionar el clima real de cada zona.',
      "Diseña la regla que detecta anomalías operativas: marca como 'anómalo' cualquier panel que generó 0 kWh en un día donde su municipio tuvo alta radiación solar (por encima del percentil 60), lo cual indica una falla real de hardware y no falta de sol.",
    ],
    codigo: [
      {
        titulo: 'Celda 11 — Duplicados, tipos de datos e imputación por mediana zonal',
        lenguaje: 'python',
        codigo: `df_limpio = df.copy()
df_limpio = df_limpio.drop_duplicates()

df_limpio["fecha_medicion"] = pd.to_datetime(df_limpio["fecha_medicion"])
df_limpio["temperatura_max"] = pd.to_numeric(df_limpio["temperatura_max"], errors="coerce")
df_limpio["radiacion_solar"] = pd.to_numeric(df_limpio["radiacion_solar"], errors="coerce")

# Mediana POR UBICACIÓN, no global: respeta el microclima de cada municipio
for col in ["temperatura_max", "radiacion_solar"]:
    df_limpio[col] = df_limpio.groupby("ubicacion")[col].transform(lambda s: s.fillna(s.median()))`,
      },
      {
        titulo: 'Celda 12 — Regla de detección de anomalías',
        lenguaje: 'python',
        codigo: `umbral_radiacion_alta = df_limpio["radiacion_solar"].quantile(0.60)

df_limpio["anomalia"] = (
    (df_limpio["energia_generada_kwh"] == 0) &
    (df_limpio["radiacion_solar"] > umbral_radiacion_alta)
)
print(f"Registros anómalos detectados: {int(df_limpio['anomalia'].sum())}")`,
      },
      {
        titulo: 'Celda 13 — Estadísticas descriptivas',
        lenguaje: 'python',
        codigo: `df_limpio[["temperatura_max", "radiacion_solar", "energia_generada_kwh"]].describe()`,
      },
    ],
  },
  {
    slug: 'samuel-giraldo',
    nombre: 'Samuel Giraldo',
    rol: 'Análisis exploratorio, paneles críticos e informe final',
    celdas: 'Celdas 14 a 19',
    resumen: [
      'Genera las visualizaciones clave del análisis: relación temperatura vs. eficiencia, tendencia de generación durante los 30 días, comparación por estado del sensor (Activo ≈1.6 kWh, Mantenimiento ≈0.55 kWh, Fallo = 0 kWh) y ranking de municipios por energía generada.',
      "Identifica los 'paneles críticos': aquellos con 2 o más fallos durante el mes (15 de los 50 paneles totales).",
      'Genera automáticamente un informe final en texto con las cifras clave (energía total, mejor y peor ubicación, % de fallos y mantenimiento, paneles críticos) y recomendaciones de mantenimiento predictivo.',
    ],
    codigo: [
      {
        titulo: 'Celda 14 — Temperatura vs. eficiencia relativa',
        lenguaje: 'python',
        codigo: `df_limpio["eficiencia_relativa"] = np.where(
    df_limpio["radiacion_solar"] > 0,
    df_limpio["energia_generada_kwh"] / (df_limpio["radiacion_solar"] / 100),
    np.nan,
)
sns.scatterplot(data=df_limpio, x="temperatura_max", y="eficiencia_relativa", hue="estado_sensor", alpha=0.6)`,
      },
      {
        titulo: 'Celda 15 — Serie de tiempo de generación total',
        lenguaje: 'python',
        codigo: `tendencia = df_limpio.groupby("fecha_medicion")["energia_generada_kwh"].sum().reset_index()
sns.lineplot(data=tendencia, x="fecha_medicion", y="energia_generada_kwh", marker="o")`,
      },
      {
        titulo: 'Celda 16 — Boxplot por estado del sensor',
        lenguaje: 'python',
        codigo: `sns.boxplot(data=df_limpio, x="estado_sensor", y="energia_generada_kwh")`,
      },
      {
        titulo: 'Celda 17 — Ranking de generación por municipio',
        lenguaje: 'python',
        codigo: `ranking_ubicaciones = (
    df_limpio.groupby("ubicacion")["energia_generada_kwh"]
    .mean().sort_values(ascending=False).round(3)
)
ranking_ubicaciones.plot(kind="bar", color="#2e7d32")`,
      },
      {
        titulo: 'Celda 18 — Detección de paneles críticos',
        lenguaje: 'python',
        codigo: `resumen_paneles = (
    df_limpio.groupby("id_panel")
    .agg(
        fallos=("estado_sensor", lambda s: (s == "Fallo").sum()),
        mantenimientos=("estado_sensor", lambda s: (s == "Mantenimiento").sum()),
        energia_promedio=("energia_generada_kwh", "mean"),
        anomalias=("anomalia", "sum"),
    )
    .sort_values("fallos", ascending=False)
)
paneles_criticos = resumen_paneles[resumen_paneles["fallos"] >= 2]`,
      },
      {
        titulo: 'Celda 19 — Informe final automático',
        lenguaje: 'python',
        codigo: `informe = f"""
INFORME - MONITOREO DE ENERGÍA RENOVABLE
=========================================
Periodo analizado: {FECHA_INICIO} a {FECHA_FIN} ({DIAS_HISTORIAL} días)
Paneles monitoreados: {TOTAL_PANELES}

HALLAZGOS PRINCIPALES
----------------------
- Energía total generada: {total_energia:,.1f} kWh
- Ubicación más eficiente: {mejor_ubicacion}
- Ubicación menos eficiente: {peor_ubicacion}
- Paneles en estado crítico (2+ fallos): {len(paneles_criticos)} de {TOTAL_PANELES}
"""`,
      },
    ],
  },
];

/** Busca la exposición de un integrante por su slug. */
export function findExposicion(slug) {
  return equipo.find((item) => item.slug === slug);
}
