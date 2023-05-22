class ExtenedDate extends Date {
  public getPrettyDate(): string {
    return `${this.getDate()}/${this.getMonth() + 1}/${this.getFullYear()}`;
  }
  public static getNumberDate(dateString: string): number {
    const dateArray: string[] = dateString.split("-");
    const year: number = parseInt(dateArray[0]);
    const month: number = parseInt(dateArray[1]);
    const date: Date = new Date(Date.UTC(year, month - 1));
    const timestamp: number = Math.floor(date.getTime() / 1000);
    return timestamp;
  }
}
export { ExtenedDate as Date };
