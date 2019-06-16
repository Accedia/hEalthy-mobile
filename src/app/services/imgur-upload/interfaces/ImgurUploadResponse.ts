export interface ImgurUploadResponse {
  data?: ImgurUploadResponseData;
  success: boolean;
  status: number;
}

interface ImgurUploadResponseData {
  id: string;
  link: string;
  title: string | null;
  deletehash: string;
  datetime: number;
}
