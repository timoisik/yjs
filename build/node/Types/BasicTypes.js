(function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};module.exports=function(e){var n,i,r,s,l,o,c;return c={},o=[],l=function(){function t(t){null==t&&(t=e.getNextOperationIdentifier()),this.creator=t.creator,this.op_number=t.op_number}return t.prototype.on=function(e,t){var n;return null==this.event_listeners&&(this.event_listeners={}),null==(n=this.event_listeners)[e]&&(n[e]=[]),this.event_listeners[e].push(t)},t.prototype.callEvent=function(e,t){var n,i,r,s,l;if(null!=this.event_listeners[e]){for(s=this.event_listeners[e],l=[],i=0,r=s.length;r>i;i++)n=s[i],l.push(n.call(this,e,t));return l}},t.prototype.setParent=function(e){return this.parent=e},t.prototype.getUid=function(){return{creator:this.creator,op_number:this.op_number}},t.prototype.execute=function(){var e,t,n;for(this.is_executed=!0,t=0,n=o.length;n>t;t++)(e=o[t])(this._encode());return this},t.prototype.saveOperation=function(e,t){return null!=(null!=t?t.execute:void 0)?this[e]=t:null!=t?(null==this.unchecked&&(this.unchecked={}),this.unchecked[e]=t):void 0},t.prototype.validateSavedOperations=function(){var t,n,i,r,s,l;s={},r=this,l=this.unchecked;for(t in l)i=l[t],n=e.getOperation(i),n?this[t]=n:(s[t]=i,r=!1);return delete this.unchecked,r||(this.unchecked=s),r},t}(),n=function(e){function n(e,t){this.saveOperation("deletes",t),n.__super__.constructor.call(this,e)}return t(n,e),n.prototype._encode=function(){return{type:"Delete",uid:this.getUid(),deletes:this.deletes.getUid()}},n.prototype.execute=function(){return this.validateSavedOperations()?(this.deletes.applyDelete(this),n.__super__.execute.apply(this,arguments),this):!1},n}(l),c.Delete=function(e){var t,i;return i=e.uid,t=e.deletes,new n(i,t)},s=function(e){function n(e,t,i,r){this.saveOperation("prev_cl",t),this.saveOperation("next_cl",i),null!=r?this.saveOperation("origin",r):this.saveOperation("origin",t),n.__super__.constructor.call(this,e)}return t(n,e),n.prototype.applyDelete=function(e){return null==this.deleted_by&&(this.deleted_by=[]),this.deleted_by.push(e)},n.prototype.isDeleted=function(){var e;return(null!=(e=this.deleted_by)?e.length:void 0)>0},n.prototype.getDistanceToOrigin=function(){var e,t;for(e=0,t=this.prev_cl;;){if(this.origin===t)break;if(e++,this===this.prev_cl)throw new Error("this should not happen ;) ");t=t.prev_cl}return e},n.prototype.update_sl=function(){var e;return e=this.prev_cl,update("prev_cl","prev_sl"),update("next_cl","prev_sl")},n.prototype.execute=function(){var e,t,i,r,s;if(null!=this.is_executed)return this;if(this.validateSavedOperations()){if((null!=(r=this.prev_cl)?r.validateSavedOperations():void 0)&&(null!=(s=this.next_cl)?s.validateSavedOperations():void 0)&&this.prev_cl.next_cl!==this){for(e=0,i=this.prev_cl.next_cl,t=0;;){if(null==i&&(console.log(JSON.stringify(this.prev_cl.getUid())),console.log(JSON.stringify(this.next_cl.getUid()))),i===this.next_cl)break;if(i.getDistanceToOrigin()===t)i.creator<this.creator&&(this.prev_cl=i,e=t+1);else{if(!(i.getDistanceToOrigin()<t))break;t-e<=i.getDistanceToOrigin()&&(this.prev_cl=i,e=t+1)}t++,i=i.next_cl}this.next_cl=this.prev_cl.next_cl,this.prev_cl.next_cl=this,this.next_cl.prev_cl=this}return n.__super__.execute.apply(this,arguments),this}return!1},n}(l),r=function(e){function n(e,t,i,r,s){this.content=t,n.__super__.constructor.call(this,e,i,r,s)}return t(n,e),n.prototype.val=function(){return this.content},n.prototype._encode=function(){var e;return e={type:"ImmutableObject",uid:this.getUid(),content:this.content},null!=this.prev_cl&&(e.prev=this.prev_cl.getUid()),null!=this.next_cl&&(e.next=this.next_cl.getUid()),null!=this.origin&&this.origin!==this.prev_cl&&(e.origin=this.origin.getUid()),e},n}(s),c.ImmutableObject=function(e){var t,n,i,s,l;return l=e.uid,t=e.content,s=e.prev,n=e.next,i=e.origin,new r(l,t,s,n,i)},i=function(e){function n(e,t,i){this.saveOperation("prev_cl",t),this.saveOperation("next_cl",i),this.saveOperation("origin",t),n.__super__.constructor.call(this,e)}return t(n,e),n.prototype.isDeleted=function(){return!1},n.prototype.execute=function(){var e,t;if(null!=(null!=(e=this.unchecked)?e.next_cl:void 0))return n.__super__.execute.apply(this,arguments);if(null!=(t=this.unchecked)?t.prev_cl:void 0){if(this.validateSavedOperations()){if(null!=this.prev_cl.next_cl)throw new Error("Probably duplicated operations");return this.prev_cl.next_cl=this,delete this.prev_cl.unchecked.next_cl,n.__super__.execute.apply(this,arguments)}return!1}if(null!=this.prev_cl&&null==this.prev_cl.next_cl)return delete this.prev_cl.unchecked.next_cl,this.prev_cl.next_cl=this;if(null!=this.prev_cl||null!=this.next_cl)return n.__super__.execute.apply(this,arguments);throw new Error("Delimiter is unsufficient defined!")},n.prototype._encode=function(){var e,t;return{type:"Delimiter",uid:this.getUid(),prev:null!=(e=this.prev_cl)?e.getUid():void 0,next:null!=(t=this.next_cl)?t.getUid():void 0}},n}(l),c.Delimiter=function(e){var t,n,r;return r=e.uid,n=e.prev,t=e.next,new i(r,n,t)},{types:{Delete:n,Insert:s,Delimiter:i,Operation:l,ImmutableObject:r},parser:c,execution_listener:o}}}).call(this);
//# sourceMappingURL=../Types/BasicTypes.js.map