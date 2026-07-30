sap.ui.define(
     [
          "sap/ui/core/mvc/Controller",
     ],
     function (Controller) {
          "use strict";
          return Controller.extend(
               "fr.stms.fioriappdemo.controller.BaseController",
               {
                    getRouter: function () {
                         return this.getOwnerComponent().getRouter();
                    },

                    getModel: function (sName) {
                         return this.getView().getModel(sName);
                    },

                    setModel: function (oModel, sName) {
                         return this.getView().setModel(oModel, sName);
                    },

                    callBaseController: function () {
                         console.log("Hello from BaseController !")
                    }
               },
          );
     },
);