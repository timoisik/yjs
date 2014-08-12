(function(){var r;r=function(){function r(r){this.user_id=r,this.operation_counter={},this.buffer={},this.change_listeners=[]}return r.prototype.getUserId=function(){return this.user_id},r.prototype.getReservedUniqueIdentifier=function(){return{creator:"_",op_number:"_"}},r.prototype.getOperationCounter=function(){var r,t,e,o;t={},o=this.operation_counter;for(e in o)r=o[e],t[e]=r;return t},r.prototype._encode=function(r){var t,e,o,n,i,u,c,p,f,l;null==r&&(r={}),t=[],p=function(t,e){if(null==t||null==e)throw new Error("dah!");return null==r[t]||r[t]<=e},l=this.buffer;for(c in l){f=l[c];for(i in f)if(e=f[i],!isNaN(parseInt(i))&&p(c,i)){if(o=e._encode(),null!=e.next_cl){for(n=e.next_cl;null!=n.next_cl&&p(n.creator,n.op_number);)n=n.next_cl;o.next=n.getUid()}else if(null!=e.prev_cl){for(u=e.prev_cl;null!=u.prev_cl&&p(n.creator,n.op_number);)u=u.prev_cl;o.prev=u.getUid()}t.push(o)}}return t},r.prototype.getNextOperationIdentifier=function(r){var t;return null==r&&(r=this.user_id),null==this.operation_counter[r]&&(this.operation_counter[r]=0),t={creator:r,op_number:this.operation_counter[r]},this.operation_counter[r]++,t},r.prototype.getOperation=function(r){var t;if(r instanceof Object)return null!=(t=this.buffer[r.creator])?t[r.op_number]:void 0;if(null!=r)throw new Error("This type of uid is not defined!")},r.prototype.addOperation=function(r){if(null==this.buffer[r.creator]&&(this.buffer[r.creator]={}),null!=this.buffer[r.creator][r.op_number])throw new Error("You must not overwrite operations!");return this.buffer[r.creator][r.op_number]=r,r},r.prototype.addToCounter=function(r){return null==this.operation_counter[r.creator]&&(this.operation_counter[r.creator]=0),"number"==typeof r.op_number&&r.creator!==this.getUserId()?this.operation_counter[r.creator]++:void 0},r}(),module.exports=r}).call(this);
//# sourceMappingURL=HistoryBuffer.js.map