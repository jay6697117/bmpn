import axios from '@/config/http';

// 定义具体的接口方法
const api = {
  workflowApi: {//工作流相关的 API
    getBpmnXml: (modelKey: any) => axios.get(`/workflow/getEditorJson?modelKey=${modelKey}`),
    deployWorkflow: (data: any) => axios.post('/workflow/deploy', data),
    // 添加其他相关接口...
  },
  // 添加其他分类...
};

export default api;