# 🌸 DATASERVICES

## 🧩 DATASERVICES.JS (SERVICES DE DONNÉES)

```
appdemofgi/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   │
│   ├── libs/
│   │   ├── DataServices.js       			# Services de données génériques
│   │   └── Formatter.js
│   │
│   ├── localService/
│   ├── model/
│   ├── view/
│   ├── Component.js
│   ├── index.html
│   └── manifest.json
│
├── .gitignore
├── (mta.yaml)
├── package-lock.json
├── package.json
├── README.md
├── ui5-local.yaml
├── ui5-mock.yaml
└── ui5.yaml
```

> [!IMPORTANT]
>
> - 🎯 Objectif
>
>   Centraliser les appels aux services backend.
>
> - 🔨 Utilité : Encapsuler la logique d’accès aux données (OData, REST, gestion des erreurs).
> - ⌚ Quand utilisé ? Lorsqu’un contrôleur doit lire ou écrire des données sans gérer directement la complexité technique.
> - 📌 Exemple :
>
>   ```js
>   getCustomers: function (oModel) {
>       return oModel.read("/Customers");
>   }
>   ```
