export default interface IPoliceService {
  description: string;
  url: string;
  engagement_methods: {
    url: string;
    description: string;
    title: string;
  }[];
  telephone: string;
  id: string;
  name: string;
}
