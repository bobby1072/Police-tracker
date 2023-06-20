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
  public getYYYYMMDate(): string {
    const year = this.getFullYear().toString();
    let month = (this.getMonth() + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }
    return `${year}-${month}`;
  }
}
export { ExtenedDate as Date };
