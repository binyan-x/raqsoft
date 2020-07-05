function showFolder(data, toLevel, toFolderId, goback){
	$('#folderMain').html('');
	currFolderId = toFolderId;
	if(toFolderId != 0){
		$(window.top.document.getElementById('backButton')).show();
	}
	var currLevelNumber = parseInt(toLevel.split('level')[1]);
	currLevelNumberParam = currLevelNumber;
	if(currLevelNumber <= 0) return;
	if(currLevelNumber == 1){//根目录
		back = new Array();
		$('#backButton').hide();
	}else{
		$('#backButton').show();
		if(goback){//退
			back = back.deleteIndex(back.length - 1);
		}else{//进
			back.push({order:back.length+1,toFolderId:folderInfo.currFolderId,currLevel:'level'+(currLevelNumber - 1),folderName:folderInfo.currFolderName});
		}
	}
	folderInfo.currFolderId = toFolderId;
	var folders = data.folders;
	var currLevel = data.folders['level'+currLevelNumber];
	var upperLevel = data.folders['level'+(currLevelNumber-1)];
	for(var i = 0; i < currLevel.length; i++){
		var id = currLevel[i].id;
		var name = currLevel[i].name;
		var belong = currLevel[i].belong;
		if(belong != toFolderId) continue;
		var div = $('<li></li>');
		var folder = $('<a class="folder" level="level'+(currLevelNumber+1)+'" id="'+id+'" name="'+name+'"></a>');
		var img = $('<svg class="fileImg" t="1579687413382" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7326" width="32" height="32"><path d="M853.333333 256H469.333333l-85.333333-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v170.666667h853.333334v-85.333334c0-46.933333-38.4-85.333333-85.333334-85.333333z" fill="#FFA000" p-id="7327"></path><path d="M853.333333 256H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v426.666667c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V341.333333c0-46.933333-38.4-85.333333-85.333334-85.333333z" fill="#FFCA28" p-id="7328"></path></svg>');
		folder.append(img);
		div.append(folder);
		var folderSpan = $('<div class="folderSpan" id="'+id+'" name="'+name+'">'+name+'</div>');
		folder.append(folderSpan);
		$('#folderMain').append(div);
		bindFolderTap(folder);
	}
	var files = findFolderFiles(data,toFolderId,upperLevel);
	for(var j = 0; j < files.length; j++){
		for(var k = 0; k < data.files.length; k++){
			if(files[j] == data.files[k].id){
				var fid = data.files[k].id;
				var fname = data.files[k].name;
				var div = $('<li data-icon="false" class="fileOut"></li>');
				var file = $('<a class="file" id="'+fid+'" name="'+fname+'"></a>');
				var img = $('<svg class="fileImg" t="1579686070669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5123" width="32" height="32"><path d="M512 912.695652c221.295304 0 400.695652-179.400348 400.695652-400.695652S733.295304 111.304348 512 111.304348 111.304348 290.704696 111.304348 512s179.400348 400.695652 400.695652 400.695652z" fill="#0B77E3" fill-opacity=".2" p-id="5124"></path><path d="M211.478261 233.828174A33.380174 33.380174 0 0 1 244.869565 200.347826h534.26087c18.44313 0 33.391304 14.948174 33.391304 33.480348v222.430609A33.380174 33.380174 0 0 1 779.130435 489.73913H244.869565c-18.44313 0-33.391304-14.948174-33.391304-33.480347V233.828174z" fill="#40A0FF" p-id="5125"></path><path d="M233.73913 233.73913v222.608696c0 6.099478 5.019826 11.130435 11.130435 11.130435h534.26087c6.199652 0 11.130435-4.941913 11.130435-11.130435V233.73913c0-6.099478-5.019826-11.130435-11.130435-11.130434H244.869565c-6.199652 0-11.130435 4.941913-11.130435 11.130434z m-22.260869 0c0-18.44313 14.85913-33.391304 33.391304-33.391304h534.26087c18.44313 0 33.391304 15.048348 33.391304 33.391304v222.608696c0 18.44313-14.85913 33.391304-33.391304 33.391304H244.869565c-18.44313 0-33.391304-15.048348-33.391304-33.391304V233.73913z" fill="#005CB9" p-id="5126"></path><path d="M189.217391 289.480348A33.458087 33.458087 0 0 1 222.564174 256h578.871652A33.391304 33.391304 0 0 1 834.782609 289.480348v222.430609A33.458087 33.458087 0 0 1 801.435826 545.391304H222.564174A33.391304 33.391304 0 0 1 189.217391 511.910957V289.480348z" fill="#A6D2FF" p-id="5127"></path><path d="M211.478261 289.391304v222.608696c0 6.099478 5.008696 11.130435 11.085913 11.130435h578.871652c6.077217 0 11.085913-5.008696 11.085913-11.130435V289.391304c0-6.099478-5.008696-11.130435-11.085913-11.130434H222.564174c-6.077217 0-11.085913 5.008696-11.085913 11.130434z m-22.26087 0c0-18.44313 15.003826-33.391304 33.346783-33.391304h578.871652A33.435826 33.435826 0 0 1 834.782609 289.391304v222.608696c0 18.44313-15.003826 33.391304-33.346783 33.391304H222.564174A33.435826 33.435826 0 0 1 189.217391 512V289.391304z" fill="#005CB9" p-id="5128"></path><path d="M166.956522 345.043478c0-18.44313 15.059478-33.391304 33.28-33.391304h623.526956A33.391304 33.391304 0 0 1 857.043478 345.043478v445.217392c0 18.44313-15.059478 33.391304-33.28 33.391304H200.236522A33.391304 33.391304 0 0 1 166.956522 790.26087V345.043478z" fill="#FFFFFF" p-id="5129"></path><path d="M356.173913 645.565217a77.913043 77.913043 0 0 0 77.913044-77.913043h-77.913044v-77.913044a77.913043 77.913043 0 0 0 0 155.826087z" fill="#A6D2FF" p-id="5130"></path><path d="M601.043478 511.944348a11.130435 11.130435 0 0 1 11.097044-11.074783h44.588521a11.130435 11.130435 0 0 1 11.097044 11.074783v167.067826a11.130435 11.130435 0 0 1-11.097044 11.074783h-44.588521a11.130435 11.130435 0 0 1-11.097044-11.074783v-167.067826zM411.826087 512h89.043478c0-81.185391-89.043478-89.043478-89.043478-89.043478v89.043478z" fill="#40A0FF" p-id="5131"></path><path d="M612.173913 701.217391c0-92.204522 73.060174-166.956522 163.372522-166.956521h3.383652c13.83513 0 43.030261 1.758609 55.852522 5.064347V801.391304H637.328696C621.378783 775.624348 612.173913 733.952 612.173913 701.217391z" fill="#000000" opacity=".1" p-id="5132"></path><path d="M189.217391 345.043478v445.217392a11.130435 11.130435 0 0 0 11.019131 11.130434h623.526956c5.977043 0 11.01913-5.042087 11.019131-11.130434V345.043478a11.130435 11.130435 0 0 0-11.019131-11.130435H200.236522c-5.977043 0-11.01913 5.042087-11.019131 11.130435z m-22.260869 0c0-18.44313 15.059478-33.391304 33.28-33.391304h623.526956A33.391304 33.391304 0 0 1 857.043478 345.043478v445.217392c0 18.44313-15.059478 33.391304-33.28 33.391304H200.236522A33.391304 33.391304 0 0 1 166.956522 790.26087V345.043478z m512 77.913044v256h44.521739V422.956522h-44.521739z m-22.26087-11.208348a11.130435 11.130435 0 0 1 11.097044-11.052522h66.849391c6.121739 0 11.097043 4.964174 11.097043 11.052522v278.416696a11.130435 11.130435 0 0 1-11.097043 11.052521h-66.849391a11.085913 11.085913 0 0 1-11.097044-11.052521V411.748174zM612.173913 678.956522h44.521739V512h-44.521739v166.956522z m-22.26087-178.142609a11.130435 11.130435 0 0 1 11.097044-11.074783h66.849391a11.130435 11.130435 0 0 1 11.097044 11.074783v189.328696a11.130435 11.130435 0 0 1-11.097044 11.074782h-66.849391a11.130435 11.130435 0 0 1-11.097044-11.074782v-189.328696zM545.391304 601.043478v77.913044h44.521739v-77.913044h-44.521739z m-22.260869-11.174956a11.130435 11.130435 0 0 1 11.097043-11.085913h66.849392c6.121739 0 11.097043 4.953043 11.097043 11.085913v100.262956a11.130435 11.130435 0 0 1-11.097043 11.085913h-66.849392a11.085913 11.085913 0 0 1-11.097043-11.085913v-100.262956zM356.173913 645.565217a77.913043 77.913043 0 0 0 77.913044-77.913043h-77.913044v-77.913044a77.913043 77.913043 0 0 0 0 155.826087z m100.173913-100.173913v22.26087a100.173913 100.173913 0 1 1-100.173913-100.173913h22.26087v77.913043h77.913043z m-33.391304-111.304347v66.782608h66.782608a66.782609 66.782609 0 0 0-66.782608-66.782608z m0-22.26087a89.043478 89.043478 0 0 1 89.043478 89.043478v22.26087H400.695652V411.826087h22.26087z" fill="#005CB9" p-id="5133"></path><path d="M701.217391 827.89287A144.217043 144.217043 0 0 0 801.391304 868.173913c38.878609 0 74.173217-15.326609 100.173913-40.281043V812.521739h6.945392H901.565217c0-18.465391-14.914783-33.391304-33.30226-33.391304H734.519652A33.313391 33.313391 0 0 0 701.217391 812.521739h-6.945391H701.217391v15.371131z m-21.292521-25.755827A144.027826 144.027826 0 0 1 656.695652 723.478261c0-79.916522 64.768-144.695652 144.695652-144.695652 79.916522 0 144.695652 64.768 144.695653 144.695652a144.027826 144.027826 0 0 1-23.229218 78.658782A55.596522 55.596522 0 0 0 868.262957 756.869565H734.519652a55.56313 55.56313 0 0 0-54.594782 45.267478zM838.288696 756.869565h-73.817044A66.749217 66.749217 0 0 1 734.608696 701.19513v-33.346782A66.82713 66.82713 0 0 1 801.391304 601.043478c36.886261 0 66.782609 29.918609 66.782609 66.80487v33.346782A66.782609 66.782609 0 0 1 838.288696 756.869565z" fill="#A6D2FF" p-id="5134"></path><path d="M801.391304 868.173913c38.878609 0 74.173217-15.326609 100.173913-40.281043V812.521739c0-18.465391-14.914783-33.391304-33.30226-33.391304H734.519652A33.313391 33.313391 0 0 0 701.217391 812.521739v15.371131A144.217043 144.217043 0 0 0 801.391304 868.173913z" fill="#40A0FF" p-id="5135"></path><path d="M751.304348 617.73913m50.086956 0l0 0q50.086957 0 50.086957 50.086957l0 33.391304q0 50.086957-50.086957 50.086957l0 0q-50.086957 0-50.086956-50.086957l0-33.391304q0-50.086957 50.086956-50.086957Z" fill="#FFFFFF" p-id="5136"></path><path d="M634.434783 723.478261c0-92.215652 74.74087-166.956522 166.956521-166.956522s166.956522 74.74087 166.956522 166.956522-74.74087 166.956522-166.956522 166.956522-166.956522-74.74087-166.956521-166.956522z m66.782608 104.414609A144.217043 144.217043 0 0 0 801.391304 868.173913c38.878609 0 74.173217-15.326609 100.173913-40.281043V812.521739h6.945392H901.565217c0-18.465391-14.914783-33.391304-33.30226-33.391304H734.519652A33.313391 33.313391 0 0 0 701.217391 812.521739h-6.945391H701.217391v15.371131z m-21.292521-25.755827A55.56313 55.56313 0 0 1 734.519652 756.869565h133.743305c27.14713 0 49.753043 19.478261 54.594782 45.267478A144.027826 144.027826 0 0 0 946.086957 723.478261c0-79.927652-64.77913-144.695652-144.695653-144.695652-79.927652 0-144.695652 64.77913-144.695652 144.695652 0 29.005913 8.537043 56.019478 23.229218 78.658782zM838.288696 756.869565h-73.817044A66.749217 66.749217 0 0 1 734.608696 701.19513v-33.346782A66.82713 66.82713 0 0 1 801.391304 601.043478c36.886261 0 66.782609 29.918609 66.782609 66.80487v33.346782A66.782609 66.782609 0 0 1 838.288696 756.869565zM756.869565 667.848348v33.346782a44.521739 44.521739 0 1 0 89.043478 0v-33.346782a44.521739 44.521739 0 1 0-89.043478 0z" fill="#005CB9" p-id="5137"></path></svg>');
				file.append(img);
				div.append(file);
				var fileSpan = $('<div class="folderSpan" id="'+fid+'" name="'+fname+'">'+fname.substring(0,fname.indexOf('.dbd'))+'</div>');
				file.append(fileSpan);
				$('#folderMain').append(div);
				bindFileTap(file);
			}
		}
	}
	resizeFolder();
}

function resizeFolder(){
	$('.fileOut').css('height','120px');
	$('.fileImg').attr('height','120px').attr('width','120px');
	$('.folderSpan').css('height','60px').css('line-height','120px').css('font-size','80px').css('font-weight','100');
}

function findFolderFiles(data, folder, upperLevel){
	var files = data.files;
	for(var j = 0; j < upperLevel.length; j++){
		var folderj = upperLevel[j];
		if(folderj.id == folder){
			return folderj.files;
		}
	}
}

function bindFolderTap(d){
	d.on('click',function(e){
		var toFolderId = d.attr('id');
		var currLevelNumber =  d.attr('level');
		showFolder(folderInfo.data, currLevelNumber, toFolderId);
		folderInfo.currFolderName = d.attr('name');
	});
}

function bindFileTap(d){
	d.on('click',function(e){
		var file = serverFolder;
		for(var i = 1; i < back.length; i++){
			file += '/'+ back[i].folderName;
		}
		var currLevelNumber =  d.attr('level');
		file += '/'+folderInfo.currFolderName+'/' + d.attr('name');
		postToFinalView(file);
	});
}


function postToFinalView(file) {
	var backButton = $(window.top.document.getElementById('backButton'));
	var backButton2 = $(window.top.document.getElementById('backButton2'));
	backButton.hide();
	backButton2.show();
	//var frame = window.top.document.getElementsByTagName('iframe')[0];
	window.location = cp+"/servlet/dataSphereServlet?action=40&ua=mobile&dbd="+encodeURIComponent(file)+"&currFolderId="+currFolderId+"&currLevel="+currLevelNumberParam;
}
