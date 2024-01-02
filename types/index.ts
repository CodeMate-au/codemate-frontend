export interface FeatredCardProps {
    icon: string;
    title: string;
    content: string;
    index: number;
}

export interface ButtonProps {
    styles?: string;
}

export interface FeedBackProps {
    content: string;
    title: string;
    name: string;
    img: string | any;
}

export interface UserType{
    
    id: number;
    email: string;
    name: string;
    githubId: string;
    avatar: string;
      
}
