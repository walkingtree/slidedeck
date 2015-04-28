/*
 * Copyright(c) Walking Tree Consultancy Services Pvt. Ltd.
 */

/**
 * This Class provide search on tree panel on basis of search string.
 * Class provide flag option to search for leaf node only.
 * CollpaseAll and ExpandAll functionality.
 * User can implement his own code using pre-defined events.
 * 
 * Plugin supports border radius in search field for IE after IE8. 
 *
 * Implementation using inline data:
 *
 *     @example
 *     var store = Ext.create('Ext.data.TreeStore', {
 *         root: {
 *             expanded: true,
 *             children: [
 *                 { text: "detention", leaf: true },
 *                 { text: "homework", expanded: true, children: [
 *                     { text: "book report", leaf: true },
 *                     { text: "algebra", leaf: true}
 *                 ] },
 *                 { text: "WTC", expanded: true, children: [
 *                     { text: "empolyee", leaf: true },
 *                     { text: "hr", leaf: true}
 *                 ] },
 *                 { text: "buy lottery tickets", leaf: true }
 *             ]
 *         }
 *     });
 *
 *     Ext.create('Ext.tree.Panel', {
 *         title: 'Simple Tree',
 *         width: 350,
 *         height: 300,
 *         store: store,
 *         rootVisible: false,
 *         renderTo: Ext.getBody(),
 *         plugins: [
 *               Ext.create('wtc.ux.plugin.TreeSearch', {
 *                  filterFn: ''
 *               })
 *         ],
 *         listeners: {
 *              textentered: function(plugin, ths, value) {
 *                                    
 *              }
 *          }
 *     });
 *
 */

Ext.define('wtc.ux.plugin.TreeSearch', {
    alias:'plugin.treesearch',

    extend:'Ext.AbstractPlugin',

    config: {

        /**
        * @cfg {Boolean} collapseOnClear
        * True to collpase tree after clearsearch.
        */
        collapseOnClear: true,

        /**
        * @cfg {Boolean} allowParentFolders
        * True to allow parents folder in tree search.
        */
        allowParentFolders: true,

        /**
        * @cfg {String} collapseAllTooltip
        * Tooltip text for collapseAll button.
        */
        collapseAllTooltip: 'Collapse All',

        /**
        * @cfg {String} expandAllTooltip
        * Tooltip text for expandAll button.
        */
        expandAllTooltip: 'Expand All',

        /**
        * @cfg {String} collapseAllIconCls
        * cls for collapse all icon.
        */
        collapseAllIconCls: 'collapseall',

        /**
        * @cfg {String} expandAllIconCls
        * cls for expand all icon.
        */
        expandAllIconCls: 'expandall', 

        /**
        * @cfg {object} finlterFn
        * function to filter tree
        * Default to ''
        */
        filterFn: ''
    },

    /*Initialization of plugin*/
    init:function (treeView) {
        var me = this;
        
        me.highlightCls = me.config.highlightCls;
        if(this.config.highlightSearch && Ext.isEmpty(me.config.highlightCls)){
         
            getHighlightCls='default-searchitem-highlight-cls';
        }  

        treeView.on('render', me.onFieldRender, me, {single: true});    
        treeView.on('afteritemexpand', me.expandnode, '', treeView, 2);
    },

    /**
  * Function to render search component into tree panel
  * @param {object} treepanel
  */
    onFieldRender:function (treeView) {
        var me = this;




        treeView.hideCollapseTool = true;
        var toolBar = new Ext.Toolbar({
            position: 'top'
            ,items:[
                {
                    xtype: 'textfield'
                    ,name: 'searchfield'
                    ,cls: 'searchFiledRadious'
                    ,enableKeyEvents: true
                    ,listeners: {
                        keyup: function(ths, e, eOpts) {
                            if (ths.value) {
                                me.textentered(me, treeView, ths.value);
                            } else {
                                me.clearfilter(me, treeView);
                            }
                        }
                    }
                }, {

                    iconCls : 'collapseall',
                    width  : 23,
                    tooltip: 'Collapse All',
                    handler:function() {
                        this.up('treepanel').collapseAll();
                    }
                }, {

                    iconCls : 'expandall',
                    tooltip: 'Expand All',
                    width  : 23,
                    handler:function() {
                        if (this.up('treepanel').dockedItems.getAt(2).items.getAt(0).value) {
                            me.textentered(me, treeView, this.up('treepanel').dockedItems.getAt(2).items.getAt(0).value);
                        } else {
                            this.up('treepanel').expandAll();
                        }

                    }
                }, {
                    xtype: 'cycle'
                    ,showText: true
                    ,prependText: 'For '
                    ,menu: {
                        id: 'view-type-menu',
                        items: [{
                            text: 'All Nodes'

                            ,checked: true
                        }, {
                            text: 'Leaf Nodes'

                        }]
                    }
                    ,changeHandler: function(cycleBtn, activeItem) {                    
                        if (activeItem.itemIndex === 1) {
                            me.allowParentFolders = false;
                            me.textentered(me, this.up('treepanel'), this.up('treepanel').dockedItems.getAt(2).items.getAt(0).value);
                        } else {
                            me.allowParentFolders = true;
                            me.textentered(me, this.up('treepanel'), this.up('treepanel').dockedItems.getAt(2).items.getAt(0).value);
                        }
                    }
                }
            ]
        });
        treeView.addDocked(toolBar);
    }

    /**
   * @event textentered
   * Fires on text entered or change into searchfield
   * @param ths plugin component
   * @param treeView tree panel
   * @param value search field value
   */
    ,textentered: function(ths, treeView, value) {

        if(true) {

            var tree = ths
            ,matches = []
            ,root = treeView.getRootNode()
            ,property = property || 'text'
            ,re = re || new RegExp(value, "ig")
            ,visibleNodes = []
            ,viewNode
            ,me = ths;

            if (Ext.isEmpty(value)) {
                me.clearFilter();
                return;
            }

            treeView.expandAll();

            root.cascadeBy(function(node) {
                if (node.get(property).match(re)) {
                    if(me.config.highlightSearch === true){
                        node.set('cls', me.highlightCls);
                    }
                    matches.push(node);
                } else { 
                    node.set('cls','');
                }
            });

            if(me.allowParentFolders === false) {
                Ext.each(matches, function(match) {
                    if (!match.isLeaf()) {
                        Ext.Array.remove(matches, match);
                    }
                });
            }

            Ext.each(matches, function(item, i, arr) {
                root.cascadeBy(function(node) {
                    if (node.contains(item) === true) {
                        visibleNodes.push(node);
                    }
                });
                if (me.allowParentFolders === true && !item.isLeaf()) {
                    item.cascadeBy(function(node) {
                        visibleNodes.push(node);
                    });
                }
                visibleNodes.push(item);
            });

            root.cascadeBy(function(node) {
                viewNode = Ext.fly(treeView.getView().getNode(node));
                if (viewNode) {
                    viewNode.setVisibilityMode(Ext.Element.DISPLAY);
                    viewNode.setVisible(Ext.Array.contains(visibleNodes, node));
                }
            });
        } else {


        }
    }

    /**
   * @event clearfilter
   * Fires on searchfield value is null
   * @param ths plugin component
   * @param treeView tree panel
   */
    ,clearfilter: function(ths, treeView) {
        var me = ths
        ,root = treeView.getRootNode();

        if (me.collapseOnClear) {
            treeView.expandAll();
        }
        root.cascadeBy(function(node) {
            node.set('cls','');
            viewNode = Ext.fly(treeView.getView().getNode(node));
            if (viewNode) {
                viewNode.show();
            }
        });
    }

    /**
   * @event expandnode
   * Fires on expanding tree panel node manually by clicking on node
   * @param node expended node of tree
   * @param index index of node
   * @param {object} treeView description
   */
    ,expandnode: function(node, index, root, treeView, itemPostion) {
        if(!itemPostion) {
            itemPostion = 2;
        }
        var value = treeView.dockedItems.getAt(itemPostion).items.getAt(0).value;


        var matches = []
        ,root = node
        ,property = property || 'text'
        ,re = re || new RegExp(value, "ig")
        ,visibleNodes = [];

        if(value) {
            root.cascadeBy(function(node) {
                if (node.get(property).match(re)) {
                    matches.push(node);
                }
            });

            Ext.each(matches, function(item, i, arr) {
                root.cascadeBy(function(node) {
                    if (node.contains(item) === true) {
                        visibleNodes.push(node);
                    }
                });
                visibleNodes.push(item);
            });

            root.cascadeBy(function(node) {
                viewNode = Ext.fly(treeView.getView().getNode(node));
                if (viewNode) {
                    viewNode.setVisibilityMode(Ext.Element.DISPLAY);
                    viewNode.setVisible(Ext.Array.contains(visibleNodes, node));
                }
            });
        }
        //myMask.hide();
    }
});