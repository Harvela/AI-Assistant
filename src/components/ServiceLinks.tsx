import { useRouter } from 'next/router';

interface Service {
  name: string;
  path: string;
  image: string;
}

const services: Service[] = [
  {
    name: 'Education',
    path: '/services/education',
    image: '/images/education.jpg',
  },
  {
    name: 'Fashion',
    path: '/services/fashion',
    image: '/images/fashion.jpg',
  },
  {
    name: 'Business',
    path: '/services/business',
    image: '/images/business.png',
  },
  {
    name: 'Hair Style',
    path: '/services/hair-style',
    image: '/images/hair.jpg',
  },
  {
    name: 'Jewelry',
    path: '/services/jewelry',
    image: '/images/jew.jpg',
  },
  {
    name: 'Shop',
    path: '/services/shop',
    image: '/images/shop.jpeg',
  },
];

export default function ServiceLinks() {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-8 px-4">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => router.push(service.path)}
            className="bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-md md:rounded-lg overflow-hidden"
          >
            <div className="relative h-10 md:h-18 md:h-24 w-full">
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