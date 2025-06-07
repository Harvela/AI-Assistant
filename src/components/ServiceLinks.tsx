import { useRouter } from 'next/router';

interface Service {
  name: string;
  path: string;
  image: string;
}

interface ServiceLinksProps {
  onServiceClick?: (service: Service) => void;
}

const services: Service[] = [
  {
    name: 'Daily Prayers & Devotionals',
    path: '/services/prayers',
    image: '/images/praying.svg',
  },
  {
    name: 'Christian Life Advice',
    path: '/services/advice',
    image: '/images/smiling.svg',
  },
  {
    name: 'Bible Study Tools (Adults & Kids)',
    path: '/services/bible-study',
    image: '/images/bible.svg',
  },
  {
    name: 'Motivational Messages & Blessings',
    path: '/services/motivation',
    image: '/images/sunset.svg',
  },
];

export default function ServiceLinks({ onServiceClick }: ServiceLinksProps) {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="grid grid-cols-2 gap-3 px-4 md:gap-4 lg:grid-cols-4">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() =>
              onServiceClick
                ? onServiceClick(service)
                : router.push(service.path)
            }
            className="overflow-hidden rounded-md bg-gray-200 shadow-md transition-shadow duration-200 hover:shadow-lg dark:bg-gray-800 md:rounded-lg"
          >
            <div className="relative h-16 w-full md:h-24">
              <img
                src={service.image}
                alt={service.name}
                className="size-full object-cover"
              />
            </div>
            <h3 className="px-2 py-1 text-center text-xs font-medium text-gray-900 dark:text-white md:py-2 md:text-sm">
              {service.name}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}
