Ext.define('SD.util.Launcher',{
    singleton:true,
    alias:'widget.SlideDeckLauncher',
    repo:null,
    github:null,    
    accessToken:null,
    count:1,
    userName:null,
    repoName:null,
    repoDirName: null,
    initComponent:function(){
        this.callParent(arguments);
    },
    constructor:function(){
       
        this.callParent(arguments);
        SlideDeck = this;
        SlideDeckonLoad(this);
    },
    htmlToString : function(html) // changes Done by seema
    {
      var span= document.createElement('span');
      span.innerHTML= html; 
      html = span.textContent || span.innerText;  
      return html
    },
    getRepository:function(){
        return this.repo;
    },
    init:function(accessToken,userName,repoName,renderTo, dirName){
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
        this.diffType = "folder";
        dirName = 'creating-universal-app-using-extjs6.md'; /*To Launch slidedeck stand alone*/
        if (Ext.isDefined(dirName)) {
            if( dirName.indexOf(".md")!=-1 ){
                 this.repoDirName = dirName;
                 this.diffType = "file"; // differentiation variable for md file and folder
                 this.masterFolder = "sencha";
            }else{
                 this.repoDirName = dirName;
            }
            
        } else {
               
                 this.repoDirName = 'Enterprise-App-Development-with-AngularJS'; /*To Launch slidedeck stand alone*/
        }
        

        this.github = new Github({
            token: this.accessToken,
            auth: "oauth"
        });
        this.repo = this.github.getRepo(this.userName,this.repoName);   
        console.log("afer this repo:"+this.repo);
        console.log("after this github:"+this.github);
        if(this.count===1){
        this.repo.show(function(err, repo) {
            Ext.create('SD.view.MyContainer',{renderTo:renderTo,height:'100%',width:'100%'});
        });
        }
        this.count=2;

    },
    
    getDirectoryName: function () {
        return this.repoDirName;
    }

});
