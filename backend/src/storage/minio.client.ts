export const minioClient = {
  upload: async (fileName: string) => ({ fileName, location: `minio://linkedai/${fileName}` })
};