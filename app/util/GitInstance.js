Ext.define('SD.util.GitInstance',{
    singleton:true,
    alias:'widget.GitInstance',
    repo:null,
    github:null,    
    accessToken:'81b881aa2b1a32b4946f9b8d2972bbfd123123121', //use a valid token
    userName:'ajit-kumar-azad',
    repoName:'training',
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