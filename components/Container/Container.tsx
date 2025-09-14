import styled from './Container.module.css';

interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return <div className={styled.container}>{children}</div>;
}
