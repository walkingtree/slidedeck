/*
 * File: app/view/TreePanelViewController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SD.view.TreePanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.treepanel',

    onTreeMenuBeforeRender: function(component, eOpts) {
        component.setLoading(true);
        var ghUtil = Ext.create('SD.view.GitHubWrapper', {});
        var treeData = ghUtil.getTree('master',function(tree,component){
            var treePnl =   Ext.ComponentQuery.query('[itemId=menuPanel]')[0];
            var st = treePnl.getStore();
            treePnl.getRootNode().appendChild(tree);

        });
    },

    onTreeLeafItemClick: function(dataview, record, item, index, e, eOpts) {
        var txt = record.data.text;
        var idx = txt.substr(txt.indexOf('.'));
        if(record.data.leaf && idx === '.md'){

            Ext.getCmp('content-pnl').mask('loading');

            var path = record.data.blobpath;
            var ghUtil = Ext.create('SD.view.GitHubWrapper', {});
            //var github = ghUtil.getInstance("a4a5d22707f8a9b42358b0c0a13d84db1f7e3783");
            //ghUtil.getRepo('ranjit-battewad', 'testapp');
            var html = "<iframe height='268' scrolling='no' src='http://codepen.io/ajit-kumar-azad/embed/{hash}/?height=268&theme-id=0' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 800px;'>See the Pen <a href='http://codepen.io/ajit-kumar-azad/pen/{hash}/'>{hash}</a> by Ajit Kumar (<a href='http://codepen.io/ajit-kumar-azad'>@ajit-kumar-azad</a>) on <a href='http://codepen.io'>CodePen</a>.</iframe>";
            var tpl =  Ext.dom.Helper.createTemplate(html);
            ghUtil.getFileContent('master', path, function(err, data) {

                console.log('DATA: ', data);
                var el = Ext.dom.Helper.createDom(data);


                var domEl = Ext.get(el);
                var hash = domEl.getAttribute('data-slug-hash');

                console.log('CODE: ', hash);
                Ext.getCmp('content-pnl').setHtml(data);
                Ext.getCmp('content-pnl').addCls('markdown-body');

                var elArr = Ext.dom.Query.select('a[href*=http://codepen.io/ajit-kumar-azad/pen]');
                for (var i = 0; i < elArr.length; i++) {
                    el = elArr[i];
                    console.log('HASH: ', Ext.get(el).getAttribute('text'));
                    console.log('EL: ', Ext.get(el).parent());

                    tpl.overwrite(Ext.get(el).parent(), {hash: Ext.get(el).getAttribute('text')});
                }

                Ext.getCmp('content-pnl').unmask();
            });
        }


    },

    onTreeMenuRender: function(component, eOpts) {
        component.setLoading(false);
    }

});
