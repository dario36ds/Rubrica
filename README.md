# 📇 Rubrica – Contact Manager

Applicazione per la gestione di una rubrica contatti, con backend API in Laravel e frontend vanilla JS su due pagine: creazione e visualizzazione/modifica.

## 📖 Descrizione

Ogni **Contatto** può avere più numeri di telefono, più indirizzi email e più indirizzi fisici, oltre a un flag "preferito". Il frontend permette di aggiungere dinamicamente più campi dello stesso tipo (es. più numeri di telefono) prima di salvare il contatto.

## ✨ Funzionalità principali

- **Crea contatto** (`crea.html`): nome, cognome, descrizione, flag preferito (⭐), più campi dinamici per numeri, email e indirizzi (pulsante "+" per aggiungerne altri)
- **Visualizza / Modifica** (`visualizza.html`): elenco contatti esistenti selezionabili da tendina, modifica dei dati, eliminazione
- API REST separate per ciascuna entità collegata al contatto (numeri, email, indirizzi)

## 🛠️ Stack tecnologico

- **Backend:** Laravel (PHP), Eloquent ORM
- **Frontend:** HTML/CSS/JavaScript vanilla (fetch API)

## 🗄️ Modello dati

`Contact` è in relazione **uno-a-molti** con:
- `PhoneNumber` (`phone_number`)
- `Email` (`mail`)
- `Location` (`address`)

## 🔌 API Endpoints

Generati via `Route::apiResource` per ciascuna risorsa:

| Risorsa    | Endpoint base     |
|------------|--------------------|
| Contatti   | `/api/contacts`     |
| Email      | `/api/emails`       |
| Numeri     | `/api/numbers`      |
| Indirizzi  | `/api/locations`    |

Ognuna espone il set completo `GET / POST / GET{id} / PUT{id} / DELETE{id}`.

## 📁 Struttura del progetto

```
Rubrica/
├── Backend/app/
│   ├── app/Http/Controllers/   # ContactController, EmailController,
│   │                           # PhoneNumberController, LocationController
│   ├── app/Models/              # Contact, Email, PhoneNumber, Location
│   ├── database/migrations/
│   └── routes/api.php
└── Frontend/
    ├── crea.html            # Form di creazione contatto
    ├── visualizza.html      # Elenco + modifica/eliminazione
    ├── main_crea.js
    ├── main_visualizza.js
    ├── api.js               # Wrapper fetch condiviso
    └── style.css
```

## 🚀 Avvio in locale

> Il repository contiene solo i file applicativi Laravel (controller, model, migration, routes): va integrato in un progetto Laravel completo per essere eseguito.

```bash
composer create-project laravel/laravel rubrica-app
# copiare dentro app/, database/migrations/ e routes/api.php dal repo
cd rubrica-app
php artisan migrate
php artisan serve --port=8000
```

Il frontend punta di default a `http://localhost:8000/api`: basta aprire `Frontend/visualizza.html` o `Frontend/crea.html` nel browser (o servirli con `live-server`).

## 👤 Autore

**Dario Stacchini**
