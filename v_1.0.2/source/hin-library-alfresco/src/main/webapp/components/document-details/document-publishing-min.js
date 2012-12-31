(function(){var f=YAHOO.util.Dom,j=YAHOO.util.Event,a=YAHOO.util.Selector;var e=Alfresco.util.encodeHTML,i=Alfresco.util.userProfileLink,m=Alfresco.Share.userAvatar;Alfresco.DocumentPublishing=function h(n){Alfresco.DocumentPublishing.superclass.constructor.call(this,"Alfresco.DocumentPublishing",n,["datasource","datatable","paginator","history","animation"]);YAHOO.Bubbling.on("metadataRefresh",this.doRefresh,this);return this};YAHOO.extend(Alfresco.DocumentPublishing,Alfresco.component.Base,{options:{nodeRef:null,siteId:"",containerId:null},onReady:function d(){this.widgets.alfrescoDataTable=new Alfresco.util.DataTable({dataSource:{url:Alfresco.constants.PROXY_URI+"api/publishing/"+this.options.nodeRef.replace("://","/")+"/events",doBeforeParseData:this.bind(function(o,n){n.data.reverse();return n})},dataTable:{container:this.id+"-publishing-events",columnDefinitions:[{key:"publishingEvent",sortable:false,formatter:this.bind(this.renderCellPublishingEvent)}],config:{MSG_EMPTY:this.msg("message.noPublishing")}}})},renderCellPublishingEvent:function g(o,n,p,q){o.innerHTML=this.getDocumentPublishingEventMarkup(n.getData())},getDocumentPublishingEventMarkup:function b(p){var C=this.options.nodeRef,r="",A="",x="",y=Alfresco.util.relativeTime(p.scheduledTime.dateTime),n=Alfresco.constants.URL_RESCONTEXT+"components/document-details/images/status-"+p.status+".png",w="",z=false,q="",v="",u="",B=this.msg("publishingHistory.event.unknownChannel"),s="";if(p.channel){v=Alfresco.constants.PROXY_URI+p.channel.channelType.icon+"/32";u=p.channel.channelType.title;B=p.channel.title;s=p.channel.id;z=p.channel.channelType.canUnpublish}for(var t=0;t<p.publishNodes.length;t++){r=p.publishNodes[t];if(r.nodeRef===this.options.nodeRef){A=r.name;x=r.version;q="publish"}}if(A===""){for(var t=0;t<p.unpublishNodes.length;t++){r=p.unpublishNodes[t];if(r.nodeRef===this.options.nodeRef){A=r.name;x=r.version;q="unpublish"}}}var D=this.msg("publishingHistory.status."+q+"."+p.status),o=this.msg("publishingHistory.status.display",D,y);if(A!==""){w+='<div class="publishing-panel-left">';w+='   <span class="document-version">'+e(x)+"</span>";w+="</div>";w+='<div class="publishing-panel-right">';w+='   <h3 class="thin dark">'+e(A)+"</h3>";w+='   <span class="actions">';if(z&&p.status==="COMPLETED"&&q==="publish"){w+='		<a href="#" name=".onUnpublishClick" rel="'+C+'" class="'+this.id+' unpublish" title="'+this.msg("publishingHistory.action.unpublish")+'">&nbsp;</a>'}w+="   </span>";w+='   <div class="clear"></div>';w+='   <div class="channel-details">';if(v!==""){w+='   <img src="'+e(v)+'" alt="'+e(u)+'" title="'+e(u)+'"/>'}w+='      <span class="channel-name">'+e(B)+"<span>";w+="   </div>";w+='   <div class="status-details">';w+='      <img src="'+e(n)+'" alt="'+e(D)+'" title="'+e(D)+'"/><span class="status">'+o+"<span>";w+="   </div>";w+="</div>";w+='<div class="clear"></div>'}return w},onUnpublishClick:function c(o,n){var p=this,q=this.widgets.alfrescoDataTable.widgets.dataTable.getRecord(n).getData().channel.id;Alfresco.util.PopupManager.displayPrompt({title:p.msg("publishingHistory.unpublish.title"),text:p.msg("publishingHistory.unpublish.confirm"),buttons:[{text:p.msg("button.ok"),handler:function(){this.destroy();var r=Alfresco.constants.PROXY_URI+"/api/publishing/queue";Alfresco.util.Ajax.request({url:r,method:Alfresco.util.Ajax.POST,requestContentType:"application/json",responseContentType:"application/json",dataObj:{channelId:q,unpublishNodes:[o]},successCallback:{fn:p.onUnpublishSuccess,scope:p},failureCallback:{fn:function s(t){Alfresco.util.PopupManager.displayPrompt({text:p.msg("publishingHistory.unpublish.failure")})},scope:p}})}},{text:p.msg("button.cancel"),handler:function(){this.destroy()},isDefault:true}]})},onUnpublishSuccess:function l(n){Alfresco.util.PopupManager.displayMessage({text:this.msg("publishingHistory.unpublish.success")});this.doRefresh()},doRefresh:function k(){var n=this.widgets.alfrescoDataTable.widgets.dataTable;n.getDataSource().sendRequest("",{success:n.onDataReturnInitializeTable,scope:n})}})})();