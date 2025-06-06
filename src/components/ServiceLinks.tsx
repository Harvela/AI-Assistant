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
    image: '/images/prayer.jpg',
  },
  {
    name: 'Christian Life Advice',
    path: '/services/advice',
    image: '/images/advice.jpg',
  },
  {
    name: 'Bible Study Tools (Adults & Kids)',
    path: '/services/bible-study',
    image: '/images/bible-study.jpg',
  },
  {
    name: 'Motivational Messages & Blessings',
    path: '/services/motivation',
    image: '/images/motivation.jpg',
  },
];

export default function ServiceLinks({ onServiceClick }: ServiceLinksProps) {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 px-4">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() =>
              onServiceClick
                ? onServiceClick(service)
                : router.push(service.path)
            }
            className="bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-md md:rounded-lg overflow-hidden"
          >
            <div className="relative h-16 md:h-24 w-full">
              <img
                src={service.image}
                alt={service.name}
                className="object-cover h-full w-full"
              />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white py-1 md:py-2 px-2 text-center text-xs md:text-sm">
              {service.name}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
} 