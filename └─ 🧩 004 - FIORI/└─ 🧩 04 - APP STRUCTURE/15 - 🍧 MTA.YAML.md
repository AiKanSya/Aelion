# 🌸 MTA.YAML

> 🌺 Objectifs
>
> - [ ] Définir la configuration de l’application multi-target (MTA) pour SAP BTP ou onPremise.
> - [ ] Centraliser les modules, services et dépendances.
> - [ ] Préparer l’application pour le déploiement sur différents environnements.

## 🧩 DEFINITION

`mta.yaml` est le fichier de configuration MTA (Multi-Target Application).  
Il décrit :

- Les modules de l’application (UI, backend, services).
- Les services nécessaires (HANA, destination, OData, etc.).
- Les dépendances entre modules pour le déploiement.

> [!TIP]  
> Pense au `mta.yaml` comme au plan de construction : il indique comment assembler tous les composants de ton application pour la déployer.

## 🧩 UTILITE

- Permet de déployer l’application sur SAP BTP ou onPremise.
- Déclare les modules UI5, CAP, OData, etc.
- Gère les dépendances entre les modules pour que tout fonctionne correctement après le déploiement.

> [!TIP]  
> Même si tu développes localement, ce fichier est nécessaire pour préparer ton application pour le cloud ou le système onPremise.

## 🧩 POINTS IMPORTANTS

- Contient les informations sur le build et le déploiement.
- Chaque module possède un type (`html5`, `java`, `nodejs`, etc.) et un chemin.
- Les services externes nécessaires doivent être définis ici pour qu’ils soient provisionnés automatiquement lors du déploiement.

## 🧩 EXEMPLE

```yaml
	_schema-version: "3.2"
	ID: appdemofgi
	version: 1.0.0
	description: "Demo Fiori App"
	modules:
	  - name: appdemofgi-ui
	    type: html5
	    path: webapp
	    build-parameters:
	      builder: grunt
	      build-result: dist
	    parameters:
	      disk-quota: 256M
	      memory: 256M
	    requires:
	      - name: ui5-service
	        group: destinations
```
