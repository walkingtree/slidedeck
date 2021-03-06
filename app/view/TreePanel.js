/*
 * File: app/view/TreePanel.js
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

Ext.define('SD.view.TreePanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treepanel',

    requires: [
        'SD.view.TreePanelViewModel',
        'SD.view.TreePanelViewController',
        'SD.view.override.TreePanel',
        'Ext.tree.View',
        'Ext.panel.Tool'
    ],

    controller: 'treepanel',
    viewModel: {
        type: 'treepanel'
    },
    itemId: 'menuPanel',
    width: 360,
    collapsible: true,
    title: 'Topics',
    titleCollapse: true,
    store: 'MenuStore',
    lines: false,    
    hideHeaders: true,
    
    columns: [{
        xtype: 'treecolumn',
        flex: 1,
        dataIndex: 'text',
        renderer: function (a, b, c) {
            console.log(b);
            c.data.findAnchorText = a.split('. ')[1];
            return a;
        }
    }],

    viewConfig: {
        itemId: 'treeMenu',
        listeners: {
            beforerender: 'onTreeMenuBeforeRender',
            itemclick: 'onTreeItemClick',
            render: 'onTreeMenuRender',
            itemkeyup: 'onTreeMenuItemKeyup'
        }
    },
    tools: [
        {
            xtype: 'tool',
            callback: function(owner, tool, event) {
                var doc = window.document;
                var docEl = doc.documentElement;

                var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
                var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

                if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                    requestFullScreen.call(docEl);
                }
                else {
                    cancelFullScreen.call(doc);
                }

            },
            tooltip: 'Play the slideshow from the selected slide',
            type: 'maximize'
        }
    ]

});