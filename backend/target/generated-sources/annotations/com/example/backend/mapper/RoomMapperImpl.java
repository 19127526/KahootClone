package com.example.backend.mapper;

import com.example.backend.common.model.GenreRoom;
import com.example.backend.model.dto.AnswerDto;
import com.example.backend.model.dto.QuestionDto;
import com.example.backend.model.dto.RoomDto;
import com.example.backend.model.entity.AnswerEntity;
import com.example.backend.model.entity.QuestionEntity;
import com.example.backend.model.entity.RoomEntity;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-28T17:07:49+0700",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 19 (Oracle Corporation)"
)
@Component
public class RoomMapperImpl implements RoomMapper {

    @Override
    public RoomEntity dtoToEntity(RoomDto roomDto) {
        if ( roomDto == null ) {
            return null;
        }

        RoomEntity roomEntity = new RoomEntity();

        roomEntity.setName( roomDto.getName() );
        roomEntity.setCapacity( roomDto.getCapacity() );
        if ( roomDto.getType() != null ) {
            roomEntity.setType( Enum.valueOf( GenreRoom.class, roomDto.getType() ) );
        }
        roomEntity.setUrl( roomDto.getUrl() );
        roomEntity.setCode( roomDto.getCode() );
        roomEntity.setQuestionEntitySet( questionDtoListToQuestionEntitySet( roomDto.getQuestionEntitySet() ) );

        return roomEntity;
    }

    @Override
    public RoomDto entityToDto(RoomEntity roomEntity) {
        if ( roomEntity == null ) {
            return null;
        }

        RoomDto roomDto = new RoomDto();

        roomDto.setName( roomEntity.getName() );
        roomDto.setCapacity( roomEntity.getCapacity() );
        if ( roomEntity.getType() != null ) {
            roomDto.setType( roomEntity.getType().name() );
        }
        roomDto.setUrl( roomEntity.getUrl() );
        roomDto.setCode( roomEntity.getCode() );
        roomDto.setQuestionEntitySet( questionEntitySetToQuestionDtoList( roomEntity.getQuestionEntitySet() ) );

        return roomDto;
    }

    protected AnswerEntity answerDtoToAnswerEntity(AnswerDto answerDto) {
        if ( answerDto == null ) {
            return null;
        }

        AnswerEntity answerEntity = new AnswerEntity();

        answerEntity.setText( answerDto.getText() );
        answerEntity.setCorrect( answerDto.isCorrect() );

        return answerEntity;
    }

    protected Set<AnswerEntity> answerDtoListToAnswerEntitySet(List<AnswerDto> list) {
        if ( list == null ) {
            return null;
        }

        Set<AnswerEntity> set = new LinkedHashSet<AnswerEntity>( Math.max( (int) ( list.size() / .75f ) + 1, 16 ) );
        for ( AnswerDto answerDto : list ) {
            set.add( answerDtoToAnswerEntity( answerDto ) );
        }

        return set;
    }

    protected QuestionEntity questionDtoToQuestionEntity(QuestionDto questionDto) {
        if ( questionDto == null ) {
            return null;
        }

        QuestionEntity questionEntity = new QuestionEntity();

        questionEntity.setGenreQuestion( questionDto.getGenreQuestion() );
        questionEntity.setText( questionDto.getText() );
        questionEntity.setScore( questionDto.getScore() );
        questionEntity.setAnswer( answerDtoListToAnswerEntitySet( questionDto.getAnswer() ) );

        return questionEntity;
    }

    protected Set<QuestionEntity> questionDtoListToQuestionEntitySet(List<QuestionDto> list) {
        if ( list == null ) {
            return null;
        }

        Set<QuestionEntity> set = new LinkedHashSet<QuestionEntity>( Math.max( (int) ( list.size() / .75f ) + 1, 16 ) );
        for ( QuestionDto questionDto : list ) {
            set.add( questionDtoToQuestionEntity( questionDto ) );
        }

        return set;
    }

    protected AnswerDto answerEntityToAnswerDto(AnswerEntity answerEntity) {
        if ( answerEntity == null ) {
            return null;
        }

        AnswerDto answerDto = new AnswerDto();

        answerDto.setText( answerEntity.getText() );
        answerDto.setCorrect( answerEntity.isCorrect() );

        return answerDto;
    }

    protected List<AnswerDto> answerEntitySetToAnswerDtoList(Set<AnswerEntity> set) {
        if ( set == null ) {
            return null;
        }

        List<AnswerDto> list = new ArrayList<AnswerDto>( set.size() );
        for ( AnswerEntity answerEntity : set ) {
            list.add( answerEntityToAnswerDto( answerEntity ) );
        }

        return list;
    }

    protected QuestionDto questionEntityToQuestionDto(QuestionEntity questionEntity) {
        if ( questionEntity == null ) {
            return null;
        }

        QuestionDto questionDto = new QuestionDto();

        questionDto.setGenreQuestion( questionEntity.getGenreQuestion() );
        questionDto.setText( questionEntity.getText() );
        questionDto.setScore( questionEntity.getScore() );
        questionDto.setAnswer( answerEntitySetToAnswerDtoList( questionEntity.getAnswer() ) );

        return questionDto;
    }

    protected List<QuestionDto> questionEntitySetToQuestionDtoList(Set<QuestionEntity> set) {
        if ( set == null ) {
            return null;
        }

        List<QuestionDto> list = new ArrayList<QuestionDto>( set.size() );
        for ( QuestionEntity questionEntity : set ) {
            list.add( questionEntityToQuestionDto( questionEntity ) );
        }

        return list;
    }
}
