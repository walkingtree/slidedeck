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

    requires: [
        'Ext.app.route.Route'
    ],

    routes: {
        '#': 'processRout'
    },

    handleNodeSelection: function(record) {
        var finalText = null;
               var text = record.getPath('text');
               finalText = text.split('.');
               if(finalText.length ==1){
                   var newVal = finalText[0].replace(/[//]/g,'');
               }else {
                   var newVal = finalText[1].replace(/[/]/g,' > ');
               }
               Ext.ComponentQuery.query('[itemId=contentPanel]')[0].setTitle(newVal);

        var treePnl = Ext.ComponentQuery.query('[itemId=menuPanel]')[0];
        var text=treePnl.getStore().getRootNode();
        if(text){
            textR=text.get('text');
        }
        var blobPath=record.get('blobpath');
        var textString=blobPath.substr(textR.length+1,blobPath.length);
        this.redirectTo(''+textString);

        var bcTitle = Ext.ComponentQuery.query('[itemId=breadcrumb]')[0];
        bcTitle.setSelection(record);


        if(record.data.leaf){

           Ext.getCmp('content-pnl').mask('loading');

           var path = record.data.blobpath;
           var ghUtil = Ext.create('SD.view.GitHubWrapper', {});

           //TODO: This needs ceanup. We need to get rid of the user name in the pen
           var html = "<iframe height='268' scrolling='no' src='http://codepen.io/ajit-kumar-azad/embed/{hash}/?height=268&theme-id=0' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 800px;'>See the Pen <a href='http://codepen.io/ajit-kumar-azad/pen/{hash}/'>{hash}</a> by Ajit Kumar (<a href='http://codepen.io/ajit-kumar-azad'>@ajit-kumar-azad</a>) on <a href='http://codepen.io'>CodePen</a>.</iframe>";
           var tpl =  Ext.dom.Helper.createTemplate(html);
           ghUtil.getFileContent('master', path, function(err, data) {

               var el = Ext.dom.Helper.createDom(data);
               var domEl = Ext.get(el);
               var hash = domEl.getAttribute('data-slug-hash');
               var header = '<div class="slide head"><span class="logo"></span><h3>' + record.parentNode.data.text + '</h3><h2 class="slide">' + record.data.text + '</h2></div>';
               Ext.getCmp('content-pnl').setHtml(header + data);
               Ext.getCmp('content-pnl').addCls('markdown-body');

               //TODO: This needs ceanup. We need to get rid of the user name in the pen
               var elArr = Ext.dom.Query.select('a[href*=http://codepen.io/ajit-kumar-azad/pen]');
               for (var i = 0; i < elArr.length; i++) {
                   el = elArr[i];
                   tpl.overwrite(Ext.get(el).parent(), {hash: Ext.get(el).getAttribute('text')});
               }
               Ext.getCmp('content-pnl').unmask();
           });


        } else {
           //It is a parent node...just create a dummy slide content from the node text

           //TODO: Make this configurable
           var html = '<div class="topic"><div class="head"><h1>' + record.data.text + '</h1></div><div class="footer">' +
               '2008 — 2015 Walking Tree Consultancy Services Pvt. Ltd. All rights reserved. This document is provided for the sole use of a named ' +
               'participant in a technical training course.  Any other use or reproduction of this document is ' +
               'unlawful without the express written consent of Walking Tree Consultancy Services Pvt. Ltd.</div></div>';
           Ext.getCmp('content-pnl').setHtml(html);

        }

        var treePnl = Ext.ComponentQuery.query('[itemId=menuPanel]')[0];
        treePnl.getSelectionModel().select(record);
        var bcTitle = Ext.ComponentQuery.query('[itemId=breadcrumb]')[0];
        bcTitle.setSelection(record);
    },

    processRout: function() {
        var token = Ext.util.History.getToken();

        var treePnl = this.view;
        var bcTitle = Ext.ComponentQuery.query('[itemId=breadcrumb]')[0];
        var st = treePnl.getStore();
        var extraToken=st.getRootNode().get('blobpath')+'/';
        var text=extraToken+token;
        var rec=st.findNode('blobpath',text);
        console.log(rec);
        var x = bcTitle.getState();
        if(!rec){
            rec=st.getAt(0);
        }

        treePnl.getSelectionModel().select(rec);
        var path = rec.getPath('text');
        bcTitle.setSelection(rec);
        treePnl.expandPath(path,'text');
        treePnl.getController().handleNodeSelection(rec);
    },

    onTreeMenuBeforeRender: function(component, eOpts) {
        var ghUtil = Ext.create('SD.view.GitHubWrapper', {});
        var treePnl = this.view;
        var bcTitle = Ext.ComponentQuery.query('[itemId=breadcrumb]')[0];
        var st = treePnl.getStore();

        var treeData = ghUtil.getTree('master',function(tree,component){
            st.setRootNode(tree[0]);
            treePnl.collapseAll();
            if (treePnl.getRootNode().hasChildNodes()) {
                treePnl.getRootNode().expand();
                treePnl.getController().processRout();
            } else {
                console.log('no childs');
            }

            bcTitle.setStore(st);
            var currentNode = treePnl.getSelection()[0];

            bcTitle.setSelection(currentNode);
            bcTitle.addListener('selectionchange',function(th,node,eOpts){
                var record = th.getSelection();
                var treePnl = this.view;
                bcTitle.setSelection(record);
                treePnl.getController().handleNodeSelection(record);
                treePnl.getSelectionModel().select(record);

            });

        });
    },

    onTreeItemClick: function(dataview, record, item, index, e, eOpts) {
        this.handleNodeSelection(record);

    },

    onTreeMenuRender: function(component, eOpts) {
        component.setLoading(false);
    },

    onTreeMenuItemKeyup: function(dataview, record, item, index, e, eOpts) {

        var treePnl =   Ext.ComponentQuery.query('[itemId=menuPanel]')[0];
        if (e.getKey() == Ext.EventObject.DOWN) {

            treePnl.getController().onTreeItemClick('',record);
        }else if (e.getKey() == Ext.EventObject.UP) {
            treePnl.getController().onTreeItemClick('',record);

        }else if (e.getKey() == Ext.EventObject.LEFT) {

            treePnl.getController().onTreeItemClick('',record);

        }else if (e.getKey() == Ext.EventObject.RIGHT) {
            var treeParentNode = record.parentNode;
            if(treeParentNode) {
                return false;
            }
            if(treePnl.selection.data.leaf === true)
            {
                return false;
            }else{
                treePnl.getController().onTreeItemClick('',record);
            }
        }
    }

});
