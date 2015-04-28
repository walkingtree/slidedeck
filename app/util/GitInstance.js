Ext.define('SD.util.GitInstance',{
   singleton:true,
   alias:'widget.GitInstance',
   repo:null,
   github:null,    
   accessToken:'4264db8425847d3131692fd814eda8b04502f309',
   userName:'ranjit-battewad',
   repoName:'testapp',
   initComponent:function(){
       this.callParent(arguments);
   },
   constructor:function(){
       this.github = new Github({
             token: this.accessToken,
             auth: "oauth"
       });
       this.repo = this.github.getRepo(this.userName,this.repoName);
       this.repo.show(function(err, repo) {
          
       });
       
       this.callParent(arguments);
   },
   getRepository:function(){
       return this.repo;
   }
   
   
   
});