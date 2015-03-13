var app = {
    // Application Constructor
    isAndroid:false,
    apiServer:"http://ion.nonstoptv.tv/",
    initialize: function() {           
        $.mobile.utils.showWaitBox("a", "Iniciando Bapro Mobile");
        this.bindEvents();
        //Inicio de APP        
        //if (deviceDetect.Android()!=null)this.isAndroid=true;        
        this.showLoadingBar("Iniciando Aplicación");
        
    },
    // Bind Event Listeners
    bindEvents: function() {        
        document.addEventListener("deviceready", app.onDeviceReady, false);                            
    },
    cargarNotas:function(categoria){
        app.showLoadingBar("Cargando Noticias");
        $.getJSON(this.apiServer + 'rss/parser.php', function(data) {

        var source   = $("#rss-template").html();
        var template = Handlebars.compile(source);

        $.each(data, function (key, data) {                
            var context = {title: data.titulo, body: data.desc,foto:data.foto};
            $('.result').append(template(context));                
        })

          app.hideLoadingBar();
        });

    },
    showLoadingBar:function(message){      
        $.mobile.loading( 'show', {
            text: message,
            textVisible: true,
            theme: 'z',
            html: ""
        });             
    },
    hideLoadingBar:function(){
        $.mobile.loading( 'hide', {});
    },
    loadRss:function(){
        //var feed = 'http://www.frenterenovador.org.ar/feed/';
        var feed = 'rss';
        app.cargarNotas(feed);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {    
        $.mobile.utils.hideWaitBox();
        app.hideLoadingBar();                
        this.loadRss("home");    
        app.receivedEvent('deviceready');        
    },    
    onPageLoad:function(){   
        
        
    },
    receivedEvent: function(id) {
        
        //alert(id);
        //$('#headerT').html("Cargado");
    }
};