# 🌸 ANNOTATIONS

## 🧩 ANNOTATIONS/ (ANNOTATIONS ODATA)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)              		# dossier d’annotations OData
│   │
│   ├── controller/
│   ├── i18n/
│   ├── libs/
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
>   Centraliser les dossier d’annotations OData utilisés par l’application.
>
> - 🔨 Utilité : Enrichir le modèle OData avec des informations supplémentaires (UI, labels, champs obligatoires, comportements).
> - ⌚ Quand utilisé ? Lorsqu’on souhaite influencer l’affichage ou le comportement UI sans modifier le service backend.
> - 📌 Exemple :
>
>   Ajouter un libellé lisible à un champ OData pour l’affichage dans l’UI.

### 🍧 ANNOTATION.XML (DESCRIPTIONS UI ODATA)

```
fgifirstappmodulename/
├── webapp/
│   ├── (annotations/)       # <- Dossiers d'annotations
│   │   └── (annotation.xml) # <- Fichier décrivant les métadonnées supplémentaires pour le modèle
│   │
│   ├── controller/
│   ├── i18n/
│   ├── libs/
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
>   Décrire des métadonnées complémentaires pour un service OData.
>
> - 🔨 Utilité : Contrôler l’affichage UI (labels, champs visibles, sections, importance) via des annotations standards SAP (niveau avancé).
> - ⌚ Quand utilisé ? Quand on développe une application Fiori utilisant OData et que l'on veut enrichir le modèle sans toucher au backend ABAP.

📌 Exemple :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<edmx:Edmx
    xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx"
    xmlns="http://docs.oasis-open.org/odata/ns/edm">

    <edmx:Reference Uri="https://sap.github.io/odata-vocabularies/vocabularies/UI.xml">
        <edmx:Include Namespace="com.sap.vocabularies.UI.v1" Alias="UI"/>
    </edmx:Reference>

    <edmx:Reference Uri="https://sap.github.io/odata-vocabularies/vocabularies/Common.xml">
        <edmx:Include Namespace="com.sap.vocabularies.Common.v1" Alias="Common"/>
    </edmx:Reference>

    <edmx:DataServices>

        <Schema Namespace="local.annotations">

            <!-- ===================================================== -->
            <!-- SESSION -->
            <!-- ===================================================== -->

            <Annotations Target="ZFGI_FIORI_DEMO_SRV.Session">

                <!-- ============================= -->
                <!-- Labels -->
                <!-- ============================= -->

                <Annotation Term="Common.Label" Qualifier="IdSession">
                    <String>Identifiant Session</String>
                </Annotation>

                <!-- ============================= -->
                <!-- Header -->
                <!-- ============================= -->

                <Annotation Term="UI.HeaderInfo">
                    <Record>
                        <PropertyValue Property="TypeName" String="Session"/>
                        <PropertyValue Property="TypeNamePlural" String="Sessions"/>

                        <PropertyValue Property="Title">
                            <Record Type="UI.DataField">
                                <PropertyValue Property="Value" Path="IdSession"/>
                            </Record>
                        </PropertyValue>

                        <PropertyValue Property="Description">
                            <Record Type="UI.DataField">
                                <PropertyValue Property="Value" Path="Site"/>
                            </Record>
                        </PropertyValue>
                    </Record>
                </Annotation>

                <!-- ============================= -->
                <!-- SmartTable -->
                <!-- ============================= -->

                <Annotation Term="UI.LineItem">
                    <Collection>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Session"/>
                            <PropertyValue Property="Value" Path="IdSession"/>
                        </Record>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Année"/>
                            <PropertyValue Property="Value" Path="Annee"/>
                        </Record>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Durée"/>
                            <PropertyValue Property="Value" Path="Duree"/>
                        </Record>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Site"/>
                            <PropertyValue Property="Value" Path="Site"/>
                        </Record>

                    </Collection>
                </Annotation>

                <!-- ============================= -->
                <!-- SmartFilterBar -->
                <!-- ============================= -->

                <Annotation Term="UI.SelectionFields">
                    <Collection>
                        <PropertyPath>IdSession</PropertyPath>
                        <PropertyPath>Annee</PropertyPath>
                        <PropertyPath>Site</PropertyPath>
                    </Collection>
                </Annotation>

                <!-- ============================= -->
                <!-- Object Page -->
                <!-- ============================= -->

                <Annotation Term="UI.FieldGroup" Qualifier="General">

                    <Record>
                        <PropertyValue Property="Data">

                            <Collection>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Session"/>
                                    <PropertyValue Property="Value" Path="IdSession"/>
                                </Record>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Année"/>
                                    <PropertyValue Property="Value" Path="Annee"/>
                                </Record>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Durée"/>
                                    <PropertyValue Property="Value" Path="Duree"/>
                                </Record>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Site"/>
                                    <PropertyValue Property="Value" Path="Site"/>
                                </Record>

                            </Collection>

                        </PropertyValue>
                    </Record>

                </Annotation>

                <!-- ============================= -->
                <!-- Facettes -->
                <!-- ============================= -->

                <Annotation Term="UI.Facets">
                    <Collection>

                        <Record Type="UI.ReferenceFacet">
                            <PropertyValue Property="Label" String="Informations générales"/>
                            <PropertyValue Property="Target" AnnotationPath="@UI.FieldGroup#General"/>
                        </Record>

                    </Collection>
                </Annotation>

            </Annotations>

            <!-- ===================================================== -->
            <!-- CONSULTANT -->
            <!-- ===================================================== -->

            <Annotations Target="ZFGI_FIORI_DEMO_SRV.Consultant">

                <!-- ============================= -->
                <!-- Header -->
                <!-- ============================= -->

                <Annotation Term="UI.HeaderInfo">

                    <Record>

                        <PropertyValue Property="TypeName" String="Consultant"/>
                        <PropertyValue Property="TypeNamePlural" String="Consultants"/>

                        <PropertyValue Property="Title">
                            <Record Type="UI.DataField">
                                <PropertyValue Property="Value" Path="Name"/>
                            </Record>
                        </PropertyValue>

                        <PropertyValue Property="Description">
                            <Record Type="UI.DataField">
                                <PropertyValue Property="Value" Path="Entreprise"/>
                            </Record>
                        </PropertyValue>

                    </Record>

                </Annotation>

                <!-- ============================= -->
                <!-- SmartTable -->
                <!-- ============================= -->

                <Annotation Term="UI.LineItem">

                    <Collection>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Nom"/>
                            <PropertyValue Property="Value" Path="Name"/>
                        </Record>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Entreprise"/>
                            <PropertyValue Property="Value" Path="Entreprise"/>
                        </Record>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Ville"/>
                            <PropertyValue Property="Value" Path="City"/>
                        </Record>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Pays"/>
                            <PropertyValue Property="Value" Path="Country"/>
                        </Record>

                        <Record Type="UI.DataField">
                            <PropertyValue Property="Label" String="Langue"/>
                            <PropertyValue Property="Value" Path="Lang"/>
                        </Record>

                    </Collection>

                </Annotation>

                <!-- ============================= -->
                <!-- SmartFilterBar -->
                <!-- ============================= -->

                <Annotation Term="UI.SelectionFields">

                    <Collection>
                        <PropertyPath>Name</PropertyPath>
                        <PropertyPath>Entreprise</PropertyPath>
                        <PropertyPath>City</PropertyPath>
                        <PropertyPath>Country</PropertyPath>
                    </Collection>

                </Annotation>

                <!-- ============================= -->
                <!-- Groupe principal -->
                <!-- ============================= -->

                <Annotation Term="UI.FieldGroup" Qualifier="PersonalInfo">

                    <Record>

                        <PropertyValue Property="Data">

                            <Collection>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Nom"/>
                                    <PropertyValue Property="Value" Path="Name"/>
                                </Record>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Entreprise"/>
                                    <PropertyValue Property="Value" Path="Entreprise"/>
                                </Record>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Date naissance"/>
                                    <PropertyValue Property="Value" Path="DateBirth"/>
                                </Record>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Ville"/>
                                    <PropertyValue Property="Value" Path="City"/>
                                </Record>

                                <Record Type="UI.DataField">
                                    <PropertyValue Property="Label" String="Pays"/>
                                    <PropertyValue Property="Value" Path="Country"/>
                                </Record>

                            </Collection>

                        </PropertyValue>

                    </Record>

                </Annotation>

                <!-- ============================= -->
                <!-- Facette -->
                <!-- ============================= -->

                <Annotation Term="UI.Facets">

                    <Collection>

                        <Record Type="UI.ReferenceFacet">
                            <PropertyValue Property="Label" String="Informations personnelles"/>
                            <PropertyValue Property="Target" AnnotationPath="@UI.FieldGroup#PersonalInfo"/>
                        </Record>

                    </Collection>

                </Annotation>

            </Annotations>

        </Schema>

    </edmx:DataServices>

</edmx:Edmx>
```
