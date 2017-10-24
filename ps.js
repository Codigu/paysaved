function Paysaved() {
    (function(){
        var jQuery;
        if (window.jQuery === undefined) {
            var script_tag = document.createElement('script');
            script_tag.setAttribute("type","text/javascript");
            script_tag.setAttribute("src",
                "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
            if (script_tag.readyState) {
              script_tag.onreadystatechange = function () { // For old versions of IE
                  if (this.readyState == 'complete' || this.readyState == 'loaded') {
                      scriptLoadHandler();
                  }
              };
            } else {
              script_tag.onload = scriptLoadHandler;
            }
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
        } else {
            jQuery = window.jQuery;
        }
        function scriptLoadHandler() {
            jQuery = window.jQuery.noConflict(true);
        }
    })();
}
Paysaved.prototype.loadButton = function(client_id, items=[], prices=[], qtys=[]){
    jQuery(document).ready(function($) {
        var jsonp_url = "https://paysaved.com/checkout/orders?callback=?";
        $.getJSON(jsonp_url, {client_id: client_id}, function(data) {
            if(typeof data.token !== "undefined"){
                if($('#psid').length){
                    var htmls = [];
                    for (var x = 0; x < items.length; x++) {
                        var y = [
                            "<input type='hidden' name='item_name[]' value="+items[x]+">",
                            "<input type='hidden' name='item_price[]' value="+prices[x]+">",
                        ];
                        htmls.push(y.join(""));
                    }
                    $('#psid').html("<form action='https://paysaved.com/checkout/orders' method='post'>"+
                        "<input type='hidden' name='token' value="+data.token+">"+
                        htmls.join("")+
                        "<button>Paysaved</button></form>");
                }else{
                    console.log("Reference element not found");
                }
            }else{
                console.log(data.error)
            }
        });
    });
};

Paysaved.prototype.initForm = function(client_id){
    jQuery(document).ready(function($){
        var jsonp_url = "https://paysaved.com/checkout/orders?callback=?";
        $.getJSON(jsonp_url, {client_id: client_id}, function(data){
            if(typeof data.token !== "undefined"){
                if ($('form').hasClass('ps-form')) {
                    $('.ps-form').attr("action", "https://paysaved.com/checkout/orders").attr("method", "post").append("<input type='hidden' name='token' value="+data.token+">")
                }else{
                    console.log("Reference element not found");
                }
            }else{
                console.log(data.error)
            }
        });
    });
}
window.ps = new Paysaved();