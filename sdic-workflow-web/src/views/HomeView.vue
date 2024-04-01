<template>
  <div class="containerBox" style="position: relative;">
    <!-- <div id="container" style="width: calc(100vw - 250px); height: calc(100vh - 50px)"></div> -->
    <div id="container" style=" height: calc(100vh - 50px)"></div>
    <div id="js-properties-panel" class="panel"></div>
    <!-- 添加保存和编辑按钮 -->
    <button @click="saveDiagram">保存</button>
  </div>
</template>

<script lang="ts" setup>
    import { onMounted, markRaw,reactive,ref } from 'vue';
    // bpmn-js相关
    import 'bpmn-js/dist/assets/diagram-js.css'; // 左边工具栏以及编辑节点的样式
    import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
    import BpmnModeler from 'bpmn-js/lib/Modeler';
    // bpmn-js-properties-panel相关
    import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
    import propertiesPanelModule from 'bpmn-js-properties-panel' 
    import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
    import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
    // 引入汉化js
    import translate from '@/assets/bpmn/translate.js'; // 导入translate.js文件
    import api from '@/config/api'; // 接口
    import { useRoute } from 'vue-router'

    const bpmnModelerA =ref()
    const isNew = ref()/* 判断是否为新增 */

    const route = useRoute()
    if(route.query.row){//修改
        isNew.value = false
    }else{//新增
        isNew.value = true
    }

    // 创建一个自定义的汉化模块
    var customTranslateModule = {
        translate: ['value', translate]
    }

    onMounted(() => {
        const containerEl = document.getElementById('container');
        const bpmnModeler = markRaw(new BpmnModeler({
            container: containerEl,
            // 添加控制板
            propertiesPanel: {
                parent: '#js-properties-panel'
            },
            // 右侧属性面板
            additionalModules: [
                propertiesPanelModule,
                propertiesProviderModule,
                customTranslateModule//汉化
            ],
            moddleExtensions: {
                camunda: camundaModdleDescriptor
            }
        }));

        // 判断当前操作是新增还是修改,新增：新建流程图；修改：根据后端给的xml反显流程图
        if (isNew.value) {
            // 新建流程图
            bpmnModeler.createDiagram(() => {
                bpmnModeler.get('canvas').zoom('fit-viewport');
            });
        } else {
            // 修改
            try {
                let params = {
                    modelKey:'xww'
                }
                api.workflowApi.getBpmnXml(params.modelKey).then(response => {
                    console.log(response.data);
                    const bpmnXml = response.data.bpmn20Xml
                    // 加载 BPMN XML 数据
                    bpmnModeler.importXML(bpmnXml, (err) => {
                        if (!err) {
                            // 处理加载成功的逻辑
                        } else {
                            console.error('加载BPMN XML时发生错误:', err);
                        }
                    });
                })
                .catch(error => {
                    console.error(error);
                });
            } catch (error) {
                console.error('获取BPMN XML时发生错误:', error);
            }
        }

        bpmnModelerA.value = bpmnModeler
    });

    // 保存
    const saveDiagram = async () => {
        try {
            const { xml } = await bpmnModelerA.value.saveXML({ format: true });
            // 解析BPMN XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'application/xml');
            // 查找process元素的id属性
            const bpmnName = xmlDoc.querySelector('process').getAttribute('id');
            // 记录或根据需要使用bpmnName
            console.log('流程ID:', bpmnName);
            console.log(xml)
            let data = {
                bpmnName:bpmnName,
                bpmnXml:xml
            }
            api.workflowApi.deployWorkflow(data).then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });

        } catch (error) {
            console.error('保存时发生错误:', error);
        }
    };


</script>
<style>
.containerBox {
  /* height:623px; */
    height: calc(100vh - 50px);
    /* margin-top: 50px; */
}
 
.containerBox #container {
    height: calc(100vh - 60px);
    /* height:100%; */
    border: 1px solid rgb(121, 121, 121);
}
 
.bpp-properties-panel [type=text] {
    box-sizing: border-box;
}
 
.panel {
    width: 300px;
    position: absolute;
    top: 1px;
    right: 1px;
    height: 100%;
    overflow: auto;
}
 
/* 右下角logo 隐藏*/
.bjs-powered-by {
    display: none;
}
/* 左侧 两行显示 */
.djs-palette .entry,.djs-palette .djs-palette-toggle {
    width: 45px;
    height:50px;
    line-height:50px;
}
/* 右侧属性面版：名称区域 */
#camunda-name{
    width:96%
}
/* Webkit浏览器(Chrome/Safari)样式 */
::-webkit-scrollbar {
  width: 9px; /* 设置滚动条宽度 */
}

::-webkit-scrollbar-thumb {
  background-color: #ccc; /* 设置滚动条thumb的背景颜色 */
  border-radius: 6px; /* 设置滚动条thumb的边角弧度 */
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 设置滚动条track的背景颜色 */
}

/* Firefox浏览器样式 */
/* 注意：这里不能设置滚动条宽度和边角弧度，因为Firefox不支持 */
/* Firefox支持的滚动条样式比较有限 */
/* 以下样式只是为了演示 */
* {
  scrollbar-width: thin;
  scrollbar-color: #ccc #f1f1f1;
}

/* IE/Edge浏览器样式 */
/* 注意：这里的设置在新版Edge中生效，旧版Edge可能需要-ms前缀 */
/* 以下样式只是为了演示 */
* {
  -ms-overflow-style: none;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f1f1f1;
}
</style>