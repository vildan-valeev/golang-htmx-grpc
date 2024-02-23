(function(){

    var api;

    // function maybeRemoveMe(elt) {
    //     var timing = elt.getAttribute("remove-me") || elt.getAttribute("data-remove-me");
    //     if (timing) {
    //         setTimeout(function () {
    //             elt.parentElement.removeChild(elt);
    //         }, htmx.parseInterval(timing));
    //     }
    // }

    htmx.defineExtension('grpc', {

        init: function (apiRef) {
            api = apiRef;
        },


        onEvent: function (name, evt) {
            const {BodyRequest} = require('./api_pb.js');
            const {APIServiceClient} = require('./api_grpc_web_pb.js');

            var client = new APIServiceClient('http://localhost:8080');
            var request = new BodyRequest();
            request.setBody('some data');

            client.addItem(request, {}, (err, response) => {
                console.log(response.getBody())
                const elt = evt.detail.elt;
                const swapStyle = elt.getAttribute("hx-swap");
                const target = api.getTarget(elt);
                const responseText = response.getBody();
                const settleInfo = api.makeSettleInfo(elt);
                api.selectAndSwap(swapStyle, target, elt, responseText, settleInfo)
            });
        }
    });
})();
