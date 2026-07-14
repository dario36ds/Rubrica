# 📒 Rubrica – Contact Manager

Applicazione per la gestione di una rubrica contatti, con backend API in Laravel e frontend vanilla JS su due pagine: creazione e visualizzazione/modifica.

## 📝 Descrizione

Ogni `Contact` può avere più numeri di telefono, più indirizzi email e più indirizzi fisici, oltre a un flag "preferito".

Il frontend permette di aggiungere dinamicamente più campi dello stesso tipo, ad esempio più numeri di telefono, prima di salvare il contatto.

## ✨ Funzionalità principali

- **Crea contatto** (`crea.html`): nome, cognome, descrizione, flag preferito (⭐), più campi dinamici per numeri, email e indirizzi
- **Visualizza / Modifica** (`visualizza.html`): elenco dei contatti esistenti, modifica dei dati ed eliminazione
- **API REST** separate per ciascuna entità collegata al contatto

## 🛠️ Stack tecnologico

- **Backend:** Laravel (PHP), Eloquent ORM
- **Frontend:** HTML, CSS e JavaScript vanilla (Fetch API)
- **Database:** MySQL
- **Ambiente:** Docker e Docker Compose

## 🗃️ Modello dati

`Contact` è in relazione uno-a-molti con:

- `PhoneNumber` (`phone_number`)
- `Email` (`mail`)
- `Location` (`address`)

## 🔌 API Endpoints

Generati tramite `Route::apiResource` per ciascuna risorsa:

| Risorsa | Endpoint base |
|---|---|
| Contatti | `/api/contacts` |
| Email | `/api/emails` |
| Numeri | `/api/numbers` |
| Indirizzi | `/api/locations` |

Ogni risorsa espone le principali operazioni CRUD tramite `GET`, `POST`, `PUT` e `DELETE`.

## 🗂️ Struttura del progetto

```text
Rubrica/
├── Backend/                     # Progetto Laravel
│   ├── app/
│   │   ├── Http/Controllers/    # Controller API
│   │   └── Models/              # Modelli Eloquent
│   ├── database/migrations/     # Migrazioni database
│   ├── routes/api.php           # Rotte API
│   ├── artisan
│   └── composer.json
│
├── Frontend/
│   ├── index.html
│   ├── crea.html                # Form di creazione contatto
│   ├── visualizza.html          # Elenco + modifica/eliminazione
│   ├── main_crea.js
│   ├── main_visualizza.js
│   ├── api.js                   # Wrapper Fetch condiviso
│   ├── shared.js
│   └── style.css
│
├── php/                         # Configurazione PHP per Docker
└── docker-compose.yml           # Configurazione dei servizi Docker
```

## 🚀 Avvio in locale

### Requisiti

- Docker
- Docker Compose

### 1. Clonare il repository

```bash
git clone https://github.com/dario36ds/Rubrica.git
cd Rubrica
```

### 2. Configurare Laravel

Creare il file `.env` partendo da `.env.example`:

```bash
cp Backend/.env.example Backend/.env
```

Verificare che la configurazione del database nel file `Backend/.env` corrisponda a quella definita nel file `docker-compose.yml`.

### 3. Avviare il progetto

```bash
docker compose up -d --build
```

### 4. Generare la chiave Laravel

```bash
docker compose exec app php artisan key:generate
```

### 5. Eseguire le migrazioni

```bash
docker compose exec app php artisan migrate
```

Il progetto sarà disponibile ai seguenti indirizzi:

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000`
- **phpMyAdmin:** `http://localhost:8080`

Per arrestare i container:

```bash
docker compose down
```

## 👤 Autore

**Dario Stacchini**
