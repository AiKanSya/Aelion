# 🌸 LOCALSERVICE & METADATA

## 🧩 LOCALSERVICE/ (SERVICES LOCAUX / MOCK)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   │
│   ├── localService/ # <- Données mock ou locales
│   │
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
>   Simuler un service backend sans dépendre d’un système SAP réel.
>
> - 🔨 Utilité : Permettre le développement et les tests de l’application sans connexion au backend.
> - ⌚ Quand utilisé ? Lors du développement local ou en l’absence de backend disponible.
> - 📌 Exemple :
>
>   Utiliser le mockserver avec la commande start-mock.

### 🍧 MAINSERVICE/ (SERVICE ODATA MOCKÉ PAR DEFAUT)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   │
│   ├── localService/
│   │   └── mainService/ # <- Dossier par défaut
│   │
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
>   Représenter un service OData fictif pour l’application.
>
> - 🔨 Utilité : Simuler la structure d’un vrai service backend (entités, propriétés, relations).
> - ⌚ Quand utilisé ? Lorsque l’application doit fonctionner sans accès à un système SAP.
> - 📌 Exemple :
>
>   Simuler un service client ou commande
>   utilisé par les vues Fiori.

### 🍧 METADATA.XML (MÉTADONNÉES DU SERVICE MOCK)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)
│   ├── controller/
│   ├── css/
│   ├── i18n/
│   ├── libs/
│   │
│   ├── localService/
│   │   └── mainService/
│   │       └── metadata.xml # <- Métadonnées du mockserver
│   │
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
>   Décrire la structure du service OData simulé.
>
> - 🔨 Utilité : Fournir au mockserver les entités, champs et types attendus par l’application.
> - ⌚ Quand utilisé ? Lors du lancement de l’application en mode mock (start-mock).
> - 📌 Exemple :

```xml
<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="1.0"
	xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">
	<edmx:DataServices m:DataServiceVersion="2.0"
		xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"
		xmlns="http://schemas.microsoft.com/ado/2008/09/edm">
		<Schema Namespace="ZFGI_FIORI_DEMO_SRV">
			<EntityType Name="Session">
				<Key>
					<PropertyRef Name="IdSession"/>
				</Key>
				<Property Name="IdSession" Type="Edm.String" Nullable="false"/>
				<Property Name="Annee" Type="Edm.String"/>
				<Property Name="Duree" Type="Edm.Decimal"/>
				<Property Name="Site" Type="Edm.String"/>
				<NavigationProperty Name="Consultants" Relationship="Session_Consultants" FromRole="Session" ToRole="Consultant"/>
			</EntityType>
			<EntityType Name="Consultant">
				<Key>
					<PropertyRef Name="IdSession"/>
					<PropertyRef Name="IdConsultant"/>
				</Key>
				<Property Name="IdSession" Type="Edm.String" Nullable="false"/>
				<Property Name="IdConsultant" Type="Edm.String" Nullable="false"/>
				<Property Name="Entreprise" Type="Edm.String"/>
				<Property Name="Name" Type="Edm.String"/>
				<Property Name="DateBirth" Type="Edm.DateTime"/>
				<Property Name="City" Type="Edm.String"/>
				<Property Name="Region" Type="Edm.String"/>
				<Property Name="Country" Type="Edm.String"/>
				<Property Name="Lang" Type="Edm.String"/>
			</EntityType>
			<Association Name="Session_Consultants">
				<End Type="Session" Multiplicity="1" Role="Session"/>
				<End Type="Consultant" Multiplicity="*" Role="Consultant"/>
				<ReferentialConstraint>
					<Principal Role="Session">
						<PropertyRef Name="IdSession"/>
					</Principal>
					<Dependent Role="Consultant">
						<PropertyRef Name="IdSession"/>
					</Dependent>
				</ReferentialConstraint>
			</Association>
			<EntityContainer Name="ZFGI_FIORI_DEMO_SRV">
				<EntitySet Name="SessionSet" EntityType="Session"/>
				<EntitySet Name="ConsultantSet" EntityType="Consultant"/>
			</EntityContainer>
		</Schema>
	</edmx:DataServices>
</edmx:Edmx>
```
