export interface MockParams {
    url: string;
    type: string;
    data?: any;
    params?: any;
    response(option?: any): Record<string, unknown>;
  }

  export  function mockXHR(): any;
  