Ext.define('SD.view.override.TreePanel', {
    override: 'SD.view.TreePanel',
    plugins: [
                Ext.create('wtc.ux.plugin.TreeSearch', {
                    highlightSearch:true,
                    highlightCls:'searchitem-highlight-cls'
                })
            ]
    
});