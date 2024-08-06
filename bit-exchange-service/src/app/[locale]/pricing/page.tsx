import type {Metadata} from "next";
import Pricing from "@/components/Pricing";


export const metadata: Metadata = {
  title: 'Pricing Page',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Search() {
  // const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      <Pricing />
    </div>
  )
}
