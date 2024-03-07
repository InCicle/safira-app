export class FileSize {
  static convertMBToBites(mb: number) {
    return 1024 ** 2 * mb;
  }

  static convertBiteToMB(bites: number) {
    return bites / 1024 ** 2;
  }
}
