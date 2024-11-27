"use client";

type CardProps = {
  title: string;
  description: string;
};

const Card = ({ title, description }: CardProps) => {
  return (
    <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 p-4 transition-colors duration-300">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default Card;
