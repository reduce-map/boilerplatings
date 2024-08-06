import data1 from "./data1.json";
import data2 from "./data2.json";
import { chunk } from "lodash";

export async function getData(): Promise<Record<string, string | boolean>[][]> {
  return (chunk(data1.concat(data2) as unknown[], 100) as Record<
    string,
    string
  >[][]).map((row, i) =>
    row.map((v) => ({
      ...v,
      title: `Title - ${i}`,
      key: `Title - ${i} - ${v.phone}`,
      isShow: true,
    }))
  );
}
