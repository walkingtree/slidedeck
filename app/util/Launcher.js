Ext.define('SD.util.Launcher',{
    singleton:true,
    alias:'widget.SlideDeckLauncher',
    repo:null,
    github:null,    
    accessToken:null,
    userName:null,
    repoName:null,
    initComponent:function(){
        this.callParent(arguments);
    },
    constructor:function(){
       
        this.callParent(arguments);
        SlideDeck = this;
        SlideDeckonLoad(this);
    },
    
    getRepository:function(){
        return this.repo;
    },
    init:function(accessToken,userName,repoName,renderTo){

        window.addEventListener("resize",function(){
           console.log('Reached-10');
           //var div=document.getElement

           SD.app.getController('Main').handleTreePanelResponsivness();
        });
        
        console.log("Token:"+accessToken+"uNam:"+userName+"repoName:"+repoName+"renderTo:"+renderTo);
        console.log("this accessToken:"+this.accessToken);
        console.log("this repoName:"+this.repoName);
        console.log("this username:"+this.userName);
        console.log("this repo:"+this.repo);
        console.log("this github:"+this.github);
        this.accessToken = accessToken;
        this.repoName = repoName;
        this.userName = userName;

        this.github = new Github({
            token: this.accessToken,
            auth: "oauth"
        });
        this.repo = this.github.getRepo(this.userName,this.repoName);   
        console.log("afer this repo:"+this.repo);
        console.log("after this github:"+this.github);
        this.repo.show(function(err, repo) {
            Ext.create('SD.view.MyContainer',{renderTo:renderTo,height:'100%',width:'100%'});
        });


    }

});
