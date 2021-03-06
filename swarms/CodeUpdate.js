/**
 *
 * CodeUpdate.js swarm is used by Core to send new code for modified swarms to adapters
 * useful while developing, a bit dangerous in production!
 *
 */
var codeUpdateSwarming =
{
    meta:{
        name:"CodeUpdate.js"
    },
    vars:{
    },
    swarmChanged:function(swarmName){
        this.reloadingSwarmName = swarmName;
        this.swarm("dispatchRefresh");
    },
    register:function(adapterName){
        this.adapterName = adapterName;
        this.swarm("doRegister");
    },
    doRegister:{
        node:"Core",
        code : function (){
            var ctxt = getGlobalContext("System:RegisteredAdapters");
            ctxt[this.adapterName] = this.adapterName;
        }
    },
    dispatchRefresh:{
    node:"Core",
        code : function (){
            var ctxt = getGlobalContext("System:RegisteredAdapters");
            for(var key in ctxt){
                if(ctxt.hasOwnProperty(key)){
                    this.swarm("reloadSwarm",key);
                }
            }
        }
    },
    reloadSwarm:{ //running in all adapters
        node:"",
        code : function (){
            thisAdapter.reloadSwarm(this.reloadingSwarmName );
        }
    }
};

codeUpdateSwarming;