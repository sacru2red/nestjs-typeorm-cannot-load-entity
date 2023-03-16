import { FileValidator } from '@nestjs/common'

export class MaxFileSizeValidatorKorean extends FileValidator {
  static MAX_SIZE = 10 * 1024 * 1024 // 10 MB

  buildErrorMessage () {
    return '파일 사이즈가 10Mb를 초과합니다.'
  }

  checkValid (file: Express.Multer.File): boolean {
    if (file.size < MaxFileSizeValidatorKorean.MAX_SIZE) {
      return true
    } else {
      return false
    }
  }

  isValid (file: Express.Multer.File | Express.Multer.File[]): boolean {
    if (Array.isArray(file)) {
      return file.every(this.checkValid)
    } else {
      return this.checkValid(file)
    }
  }
}

interface FileTypeValidatorOptions {
  fileType: string | RegExp
}

export class ImageFileValidator extends FileValidator<FileTypeValidatorOptions> {
  constructor (validationOptions?: FileTypeValidatorOptions) {
    const hasFileType = Boolean(validationOptions?.fileType)
    super(
      hasFileType
        ? validationOptions as FileTypeValidatorOptions
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#image_types
        // image/apng: 애니메이션 휴대용 네트워크 그래픽(APNG)
        // image/avif: AV1 이미지 파일 형식(AVIF)
        // image/gif: 그래픽 교환 형식(GIF)
        // image/jpeg: 공동 사진 전문가 그룹 이미지(JPEG)
        // image/png: 휴대용 네트워크 그래픽(PNG)
        // image/svg+xml: 확장 가능한 벡터 그래픽(SVG)
        // image/webp: 웹 그림 형식(WEBP)
        : { fileType: /^image\/(apng|avif|gif|jpeg|png|svg+xml|webp){1}$/ },
    )
  }

  buildErrorMessage () {
    return '허용되는 이미지 파일만 첨부할 수 있습니다.'
  }

  isValid (file: any) {
    if (typeof file.mimetype !== 'string') {
      return false
    }
    return Boolean(file.mimetype.match(this.validationOptions.fileType))
  }
}
