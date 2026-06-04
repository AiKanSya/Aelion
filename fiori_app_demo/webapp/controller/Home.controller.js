sap.ui.define(
    [
        "fr/stms/fioriappdemo/controller/BaseController",
    ],
    (BaseController) => {
        "use strict";
        return BaseController.extend(
            "fr.stms.fioriappdemo.controller.Home",
            {
                onInit: function () {

                    this.callBaseController();
                },
            },
        );
    },
);